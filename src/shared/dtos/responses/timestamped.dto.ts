import { ApiProperty } from '@nestjs/swagger';

export class TimestampDTO {
  @ApiProperty({
    type: String,
    description: 'User creation date',
  })
  public readonly createdAt: string;

  @ApiProperty({
    type: String,
    description: 'User update date',
  })
  public readonly updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'User update date',
  })
  public readonly deletedAt: string;
}
