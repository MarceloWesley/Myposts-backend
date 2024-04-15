import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaParameters } from '../pagination/types';

export class PaginationMetaDTO {
  @ApiProperty({ description: 'Current Page', minimum: 1, default: 1 })
  public readonly page: number;

  @ApiProperty({
    description: 'How many items per page',
    minimum: 5,
    maximum: 100,
    default: 10,
  })
  public readonly size: number;

  @ApiProperty({ description: 'Total count of items' })
  public readonly total: number;

  @ApiProperty({ description: 'Total of pages with given "size" and "total"' })
  public readonly pageCount: number;

  @ApiProperty({ description: 'Inform whether has previous page' })
  public readonly hasPrevious: boolean;

  @ApiProperty({ description: 'Inform whether has next page' })
  public readonly hasNext: boolean;

  public constructor({ page, size, total }: PaginationMetaParameters) {
    this.page = page;
    this.size = size;
    this.total = total;
    this.pageCount = Math.ceil(this.total / this.size);
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.pageCount;
  }
}
