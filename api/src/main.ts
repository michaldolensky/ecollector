import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

const HOSTNAME = process.env.SERVER_ADDRESS || process.env.NGINX_SERVER_NAME;
const PORT = process.env.API_PORT;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    credentials: true,
    origin: [
      'https://studio.apollographql.com',
      configService.get<string>('SERVER_URL_ORIGIN'),
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'PRODUCTION',
    }),
  );
  app.use(graphqlUploadExpress({ maxFileSize: 2 * 1000 * 1000 }));

  app.use(cookieParser());
  await app.listen(PORT);

  // AWS bucket authentication
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

  logger.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}
bootstrap();
