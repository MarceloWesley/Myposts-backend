import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities';
import { InjectModel } from '@nestjs/mongoose';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { FindUserDTO, SortUserDTO } from './dto';
import {
  PaginationDTO,
  PaginationMetaDTO,
  PaginationOptionsDTO,
} from 'src/shared/dtos';
import { CommentsService } from '../comments/comments.service';
import { PostsService } from '../posts/posts.service';
import { SortPostDTO } from '../posts/dto';
import { Post } from '../posts/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, CONNECTION_NAME_MAIN)
    private readonly userModel: Model<User>,
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  private async hashPassword(password: string) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  public async createOne(createUserDto: CreateUserDTO): Promise<User> {
    const { password, ...dto } = createUserDto;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userModel.create({
      password: hashedPassword,
      ...dto,
    });

    return user;
  }

  public async findAll({
    filter: { email, username } = {},
    pagination: { page, size },
    sort = {},
  }: {
    filter: FindUserDTO;
    pagination: PaginationOptionsDTO;
    sort: SortUserDTO;
  }) {
    const query: FilterQuery<User> = {};
    const options: QueryOptions<User> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    if (username) query.username = new RegExp(`${username}`, 'gi');
    if (email) query.email = new RegExp(`${email}`, 'gi');

    const total = await this.userModel.countDocuments(query);

    const data = await this.userModel.find(query, { password: 0 }, options);

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id, { password: 0 });

    if (!user) throw new NotFoundException();

    return user;
  }

  async findOneByEmail(email: string, options: object = { password: 0 }) {
    const user = await this.userModel.findOne({ email }, options);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateOneById(id: string, updateUserDto: UpdateUserDTO) {
    if (!id) throw new NotFoundException();

    const { password, ...dto } = updateUserDto;
    const options = {
      new: true,
      projection: { password: 0 },
    };

    const updateFields: Partial<
      Record<keyof UpdateUserDTO, UpdateUserDTO[keyof UpdateUserDTO]>
    > = dto;
    if (password) {
      const hashedPassword = await this.hashPassword(password);
      updateFields.password = hashedPassword;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateFields,
      options,
    );
    return updatedUser;
  }

  async findUserStats(id: string) {
    const query: FilterQuery<Post> = { user: id };

    const options = {};
    const postCount = await this.postsService.findPostsByUserId(query, options);
    const commentsCount = await this.commentsService.findCommentsByUserId(
      query,
      options,
    );

    if (!postCount || !commentsCount)
      throw new NotFoundException(
        'Error when searching for the number of user comments and posts',
      );

    const stats = {
      id,
      postsQtd: postCount.length,
      commentsQtd: commentsCount.length,
    };
    return stats;
  }

  async findPostsByUser(
    id: string,
    {
      pagination: { page, size },
      sort = {},
    }: {
      pagination: PaginationOptionsDTO;
      sort: SortPostDTO;
    },
  ) {
    const query: FilterQuery<Post> = { user: id };
    const options: QueryOptions<Post> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    const total = await this.postsService.countDocuments(query);
    const data = await this.postsService.findPostsByUserId(query, options);

    if (!data) {
      throw new NotFoundException('Error when searching for user posts');
    }

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  async findCommentsByUser(
    id: string,
    {
      pagination: { page, size },
      sort = {},
    }: {
      pagination: PaginationOptionsDTO;
      sort: SortPostDTO;
    },
  ) {
    const query: FilterQuery<Comment> = { user: id };
    const options: QueryOptions<Comment> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    const total = await this.postsService.countDocuments(query);
    const data = await this.commentsService.findCommentsByUserId(
      query,
      options,
    );

    if (!data) {
      throw new NotFoundException('Error when searching for user Comments');
    }

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  deleteOneById(id: string) {
    if (!id) throw new NotFoundException();
    const options = {
      projection: { password: 0 },
    };
    return this.userModel.findByIdAndDelete(id, options);
  }
}
