import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities';

type UserDTO = {
  [K in keyof User]: User[K];
};

export class CreateUserDTO implements UserDTO {
  @IsEmail()
  @MaxLength(256)
  @MinLength(8)
  public readonly email: string;

  @IsString()
  @MaxLength(32)
  @MinLength(4)
  @IsAlphanumeric()
  public readonly username: string;

  @MinLength(6)
  @MaxLength(256)
  @IsStrongPassword()
  public password: string;
}
