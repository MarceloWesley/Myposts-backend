import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  ERR_DB_FIRST_CHAR_LETTER,
  ERR_DB_MAX_256_CHARACTERS,
  ERR_DB_MAX_32_CHARACTERS,
  ERR_DB_MIN_4_CHARACTERS,
  ERR_DB_MIN_6_CHARACTERS,
  ERR_DB_MIN_8_CHARACTERS,
  ERR_DB_ONLY_ALPHANUMERIC,
  ERR_DB_REQUIRED,
  ERR_DB_UNIQUE,
} from 'src/shared/errors/database/validations';
import {
  validateAlphanumericOnly,
  validateEmail,
  validateFirstChar,
} from './custom-validations';
import { CommonFields } from 'src/shared/entities/common-fields';

@Schema({
  timestamps: true,
})
export class User extends CommonFields {
  @Prop({
    type: String,
    lowercase: [true],
    required: [true, ERR_DB_REQUIRED],
    unique: [true, ERR_DB_UNIQUE],
    minlength: [4, ERR_DB_MIN_4_CHARACTERS],
    maxlength: [32, ERR_DB_MAX_32_CHARACTERS],
    validate: [
      {
        validator: validateFirstChar,
        message: ERR_DB_FIRST_CHAR_LETTER,
      },
      {
        validator: validateAlphanumericOnly,
        message: ERR_DB_ONLY_ALPHANUMERIC,
      },
    ],
  })
  public username: string;

  @Prop({
    type: String,
    required: [true, ERR_DB_REQUIRED],
    unique: [true, ERR_DB_UNIQUE],
    minlength: [8, ERR_DB_MIN_8_CHARACTERS],
    maxlength: [256, ERR_DB_MAX_256_CHARACTERS],
    validate: [
      {
        validator: validateEmail,
        message: ERR_DB_ONLY_ALPHANUMERIC,
      },
    ],
  })
  public email: string;

  @Prop({
    type: String,
    required: [true, ERR_DB_REQUIRED],
    minlength: [6, ERR_DB_MIN_6_CHARACTERS],
    maxlength: [256, ERR_DB_MAX_256_CHARACTERS],
  })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  username: 1,
});

UserSchema.index({
  email: 'text',
});

export const UserDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};

export type UserDocument = HydratedDocument<User>;
