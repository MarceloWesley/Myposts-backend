import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class SortPostDTO {
  @ApiPropertyOptional({
    type: Number,
    description: 'Sort records by "created at" field',
    enum: [1, -1],
  })
  @IsNumber()
  @IsIn([1, -1])
  @IsOptional()
  public readonly createdAt?: number;
}
