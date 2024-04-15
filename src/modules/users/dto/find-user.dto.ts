import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsAlphanumeric,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FindUserDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'Unique "username" in the application',
    maxLength: 32,
  })
  @MaxLength(32)
  @IsAlphanumeric()
  @IsString()
  @IsOptional()
  public readonly username?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Unique "email" in the application',
    maxLength: 256,
  })
  @MaxLength(256)
  @IsString()
  @IsOptional()
  public readonly email?: string;
}
