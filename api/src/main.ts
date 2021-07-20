import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
// const NODE_ENV = process.env.NODE_ENV;

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  //TODO:
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:8080'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(PORT);

  logger.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}
bootstrap();
