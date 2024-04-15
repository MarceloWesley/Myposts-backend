import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/users/entities';

import { CommonFields } from 'src/shared/entities/common-fields';
import {
  ERR_DB_MAX_100_CHARACTERS,
  ERR_DB_MAX_5000_CHARACTERS,
  ERR_DB_MIN_3_CHARACTERS,
} from 'src/shared/errors/database/validations';

@Schema({
  timestamps: true,
})
export class Post extends CommonFields {
  @Prop({
    type: String,
    minlength: [3, ERR_DB_MIN_3_CHARACTERS],
    maxlength: [100, ERR_DB_MAX_100_CHARACTERS],
  })
  public title: string;

  @Prop({
    type: String,
    minlength: [3, ERR_DB_MIN_3_CHARACTERS],
    maxlength: [5000, ERR_DB_MAX_5000_CHARACTERS],
  })
  public content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export const PostDefinition: ModelDefinition = {
  name: Post.name,
  schema: PostSchema,
};

export type PostDocument = HydratedDocument<Post>;
