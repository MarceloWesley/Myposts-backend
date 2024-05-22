import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/modules/users/entities';

type AuthSignInDTO = Pick<User, 'email' | 'password'>;

export class SignInDTO implements AuthSignInDTO {
  @ApiProperty({
    type: String,
    description: 'Unique "email" in the application',
    minLength: 8,
    maxLength: 256,
  })
  @MinLength(8)
  @MaxLength(256)
  @IsEmail()
  public email: string;

  @ApiProperty({
    type: String,
    description: 'The password that was made in the "sign up" section',
    minLength: 6,
    maxLength: 256,
  })
  @MinLength(6)
  @MaxLength(256)
  public password: string;
}
