import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configServer = app.get<ConfigService>(ConfigService);
  const serverPort = configServer.getOrThrow('SERVER_PORT');

  const TITLE = 'Project - MyPosts';
  const DESCRIPTION = 'The main API of "MyPosts"';
  const API_VERSION = '1.0';

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

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
