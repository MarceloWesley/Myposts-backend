import { Prop } from '@nestjs/mongoose';

export class CommonFields {
  @Prop({
    type: Date,
  })
  public deletedAt?: Date;

  @Prop({
    type: Date,
  })
  public createdAt?: Date;
}
