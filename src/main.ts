import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NextModule } from './modules/next/next.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.get(NextModule).prepare().then(() => {
    app.listen(port);
  })
}
bootstrap().then(() =>
  console.log(`Application is running on: ${process.env.PORT || 3000}`),
);
