import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { HidePasswordInterceptor } from './utils/interceptors/hide-password.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new HidePasswordInterceptor());

  await app.listen(3000);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
