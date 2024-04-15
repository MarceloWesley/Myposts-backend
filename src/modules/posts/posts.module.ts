import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostDefinition } from './entities';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([PostDefinition], CONNECTION_NAME_MAIN),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
