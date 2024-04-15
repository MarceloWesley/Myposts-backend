import { Prop } from '@nestjs/mongoose';

export class CommonFields {
  @Prop({
    type: Date,
  })
  public deletedAt?: Date;
}
