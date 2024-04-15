import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class SortUserDTO {
  @ApiPropertyOptional({
    type: Number,
    description: 'Sort records by "created at" field',
    enum: [1, -1],
  })
  @IsNumber()
  @IsIn([1, -1])
  @IsOptional()
  public readonly createdAt?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Sort records by "username" field',
    enum: [1, -1],
  })
  @IsNumber()
  @IsIn([1, -1])
  @IsOptional()
  public readonly username?: number;
}
