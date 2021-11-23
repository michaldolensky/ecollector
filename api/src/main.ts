import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

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
  app.use(cookieParser());
  await app.listen(PORT);

  logger.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}
bootstrap();
