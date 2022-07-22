import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NextModule } from './modules/next/next.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(NextModule).prepare().then(() => {
    app.listen(3000);
  })
}
bootstrap();
