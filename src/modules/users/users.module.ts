import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from './entities';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition], CONNECTION_NAME_MAIN)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
