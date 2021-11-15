import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

const HOSTNAME = process.env.SERVER_ADDRESS || process.env.SERVER_ADDRESS;
const PORT = process.env.API_PORT;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:8080', 'https://studio.apollographql.com'],
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
