import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDTO {
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
}
