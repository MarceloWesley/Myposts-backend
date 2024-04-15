import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONNECTION_NAME_MAIN } from './shared/database';
import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './modules/users/users.module';
// import { PostsModule } from './modules/posts/posts.module';
// import { CommentsModule } from './modules/comments/comments.module';
// import { AuthModule } from './modules/auth/auth.module';
import { ModulesModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      connectionName: CONNECTION_NAME_MAIN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.getOrThrow('DB_URI');
        console.log(uri);
        return {
          uri,
        };
      },
    }),

    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
