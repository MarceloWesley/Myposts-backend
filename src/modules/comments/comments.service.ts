import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDTO, SortCommentDTO } from './dto';
import { UpdateCommentDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Comment } from './entities/comment.entity';

import {
  PaginationDTO,
  PaginationMetaDTO,
  PaginationOptionsDTO,
} from 'src/shared/dtos';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name, CONNECTION_NAME_MAIN)
    private readonly commentModel: Model<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDTO) {
    this.commentModel.create(createCommentDto);
  }

  public async findAll({
    pagination: { page, size },
    sort = {},
    select = {},
  }: {
    pagination: PaginationOptionsDTO;
    sort: SortCommentDTO;
    select: object;
  }) {
    const query: FilterQuery<Comment> = {};
    const options: QueryOptions<Comment> = {
      limit: size,
      skip: (page - 1) * size,
      sort,
    };

    const total = await this.commentModel.countDocuments(query);

    const data = await this.commentModel
      .find(query, {}, options)
      .populate({
        path: 'user',
        select,
      })
      .populate({
        path: 'post',
        select: '-title -content -user -createdAt -updatedAt',
      });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  async findOneById(id: string, select: object) {
    const comment = await this.commentModel
      .findById(id)
      .populate({
        path: 'user',
        select,
      })
      .populate({
        path: 'post',
        select: '-title -content -user -createdAt -updatedAt',
      });

    if (!comment) throw new NotFoundException();

    return comment;
  }

  async findCommentsByPostId(query: any, options: any) {
    const comments = await this.commentModel.find(query, {}, options);
    if (!comments) throw new NotFoundException();
    return comments;
  }

  async updateOneById(id: string, updateCommentDto: UpdateCommentDTO) {
    if (!id) throw new NotFoundException();

    const options = {
      new: true,
      projection: { user: 0, post: 0 },
    };

    const updateFields: Partial<
      Record<keyof UpdateCommentDTO, UpdateCommentDTO[keyof UpdateCommentDTO]>
    > = updateCommentDto;

    const updatedUser = await this.commentModel.findByIdAndUpdate(
      id,
      updateFields,
      options,
    );
    return updatedUser;
  }

  deleteOneById(id: string) {
    if (!id) throw new NotFoundException();

    const options = {
      projection: { user: 0, post: 0 },
    };

    return this.commentModel.findByIdAndDelete(id, options);
  }

  async findCommentsByUserId(query: any, options: any) {
    const usersComments = await this.commentModel.find(query, {}, options);
    return usersComments;
  }

  countDocuments(query: any) {
    const total = this.commentModel.countDocuments(query);
    return total;
  }
}
