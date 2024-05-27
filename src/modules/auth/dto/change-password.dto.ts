import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsStrongPassword()
  @IsNotEmpty()
  public password: string;

  @MinLength(6)
  @MaxLength(256)
  @IsStrongPassword()
  @IsNotEmpty()
  public confirmPassword: string;

  @MinLength(6)
  @MaxLength(6)
  @IsAlphanumeric()
  @IsNotEmpty()
  public code: string;

  @MinLength(8)
  @MaxLength(256)
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
