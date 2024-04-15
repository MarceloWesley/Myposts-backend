import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/modules/posts/entities';
import { User } from 'src/modules/users/entities';

import { CommonFields } from 'src/shared/entities/common-fields';
import {
  ERR_DB_MAX_5000_CHARACTERS,
  ERR_DB_MIN_3_CHARACTERS,
} from 'src/shared/errors/database/validations';

@Schema({
  timestamps: true,
})
export class Comment extends CommonFields {
  @Prop({
    type: String,
    minlength: [3, ERR_DB_MIN_3_CHARACTERS],
    maxlength: [1000, ERR_DB_MAX_5000_CHARACTERS],
  })
  public content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const CommentDefinition: ModelDefinition = {
  name: Comment.name,
  schema: CommentSchema,
};

export type CommentDocument = HydratedDocument<Comment>;
