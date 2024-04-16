import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Redis } from 'ioredis';

import * as session from 'express-session';

import { AppModule } from './app.module';

import RedisStore from 'connect-redis';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverPort = configService.getOrThrow('SERVER_PORT');

  const TITLE = 'Project - MyPosts';
  const DESCRIPTION = 'The main API of "MyPosts"';
  const API_VERSION = '1.0';

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // ----------------------------------------------------------------------
  // REDIS CONFIG
  // ----------------------------------------------------------------------

  const redisClient = new Redis({
    host: configService.getOrThrow('CACHE_HOST'),
    port: configService.getOrThrow('CACHE_PORT'),
    tls: {
      host: configService.getOrThrow('CACHE_HOST'),
      port: configService.getOrThrow('CACHE_PORT'),
    },
    username: 'default',
    password: configService.getOrThrow('CACHE_PASSWORD'),
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'mypost_session:',
  });

  // ----------------------------------------------------------------------
  // SESSION CONFIG
  // ----------------------------------------------------------------------

  app.use(
    session({
      store: redisStore,
      secret: configService.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        path: '/',
        maxAge: +configService.getOrThrow('SESSION_EXPIRES'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: TITLE,
    useGlobalPrefix: false,
  });

  await app.listen(serverPort);

  const url = await app.getUrl();
  logger.log(`listening app at ${url}`);
}
bootstrap();
