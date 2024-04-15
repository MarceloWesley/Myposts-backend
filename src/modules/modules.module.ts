import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { UsersModule } from './users';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule, CommentsModule],
})
export class ModulesModule {}
