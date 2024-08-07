import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Post } from './entities';
import {
  PaginationDTO,
  PaginationMetaDTO,
  PaginationOptionsDTO,
} from 'src/shared/dtos';
import { SortPostDTO } from './dto';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name, CONNECTION_NAME_MAIN)
    private readonly postModel: Model<Post>,
    private readonly commentsService: CommentsService,
  ) {}
  create(createPostDto: CreatePostDTO) {
    this.postModel.create(createPostDto);
  }

  public async findAll({
    pagination: { page, size },
    sort = {},
    select = {},
  }: {
    pagination: PaginationOptionsDTO;
    sort: SortPostDTO;
    select: object;
  }) {
    const query: FilterQuery<Post> = {};
    const options: QueryOptions<Post> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    const total = await this.postModel.countDocuments(query);

    const data = await this.postModel.find(query, {}, options).populate({
      path: 'user',
      select,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);
    return pagination;
  }

  async findOneById(id: string, select: object) {
    const post = await this.postModel.findById(id).populate({
      path: 'user',
      select,
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async findCommentsByPostId(
    id: string,
    {
      pagination: { page, size },
      sort = {},
    }: {
      pagination: PaginationOptionsDTO;
      sort: SortPostDTO;
    },
  ) {
    const query: FilterQuery<Comment> = { post: id };
    const options: QueryOptions<Comment> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    const total = await this.commentsService.countDocuments(query);
    const data = await this.commentsService.findCommentsByPostId(
      query,
      options,
    );

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    if (!data) throw new NotFoundException();

    return pagination;
  }

  async updateOneById(id: string, updatePostDto: UpdatePostDTO) {
    if (!id) throw new NotFoundException();

    const options = {
      new: true,
    };

    const updateFields: Partial<
      Record<keyof UpdatePostDTO, UpdatePostDTO[keyof UpdatePostDTO]>
    > = updatePostDto;

    const updatedUser = await this.postModel.findByIdAndUpdate(
      id,
      updateFields,
      options,
    );
    return updatedUser;
  }

  async findPostsByUserId(query: any, options: any) {
    const usersPosts = await this.postModel.find(query, {}, options);
    return usersPosts;
  }

  deleteOneById(id: string) {
    if (!id) throw new NotFoundException();

    return this.postModel.findByIdAndDelete(id);
  }

  countDocuments(query: any) {
    const total = this.postModel.countDocuments(query);
    return total;
  }
}
