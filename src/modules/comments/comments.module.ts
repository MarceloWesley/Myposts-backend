import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_NAME_MAIN } from 'src/shared/database';
import { CommentDefinition } from './entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([CommentDefinition], CONNECTION_NAME_MAIN),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
