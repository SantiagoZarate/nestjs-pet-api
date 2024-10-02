import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  envs.DEV && app.use(morgan('dev'));
  await app.listen(envs.PORT, () => {
    console.log(`Server up & running on http://localhost:${envs.PORT}`);
  });
}
bootstrap();
