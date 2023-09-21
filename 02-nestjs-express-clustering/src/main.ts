import { cpus } from 'node:os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import clustering from './clustering';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(3000, '0.0.0.0');
}

clustering(bootstrap, cpus().length);
