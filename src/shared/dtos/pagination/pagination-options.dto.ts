import { ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationOptionsDTO {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    description: 'Current page',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public readonly page?: number = 1;

  @ApiPropertyOptional({
    description: 'How many items per page',
    minimum: 5,
    maximum: 100,
    default: 10,
    enum: [5, 10, 15, 20, 50, 100],
  })
  @Type(() => Number)
  @IsInt()
  @IsIn([5, 10, 15, 20, 50, 100])
  @Min(5)
  @Max(100)
  @IsOptional()
  public readonly size?: number = 10;
}
