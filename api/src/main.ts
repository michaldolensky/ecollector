import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}
bootstrap();
