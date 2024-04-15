import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { CommentDefinition } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([CommentDefinition], CONNECTION_NAME_MAIN),
    UsersModule,
    PostsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
