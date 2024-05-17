import {
  IsAlphanumeric,
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsStrongPassword()
  public password: string;

  @MinLength(6)
  @MaxLength(256)
  @IsStrongPassword()
  public confirmPassword: string;

  @MinLength(6)
  @MaxLength(6)
  @IsAlphanumeric()
  public code: string;

  @MinLength(8)
  @MaxLength(256)
  @IsEmail()
  public email: string;
}
