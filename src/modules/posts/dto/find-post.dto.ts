import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsAlphanumeric,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FindPostDTO {
  @ApiPropertyOptional({
    type: String,
    description: 'title of post',
    maxLength: 100,
  })
  @MaxLength(100)
  @IsAlphanumeric()
  @IsString()
  @IsOptional()
  public readonly title?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Content of post',
    maxLength: 5000,
  })
  @MaxLength(5000)
  @IsString()
  @IsOptional()
  public readonly content?: string;

  public readonly user: {
    userId: string;
    name: string;
    email: string;
  };
}
