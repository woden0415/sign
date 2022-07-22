import { SignModule } from './../sign/sign.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextModule } from '../next/next.module';
import { NextMiddleware } from '../next/next.middleware';

@Module({
  imports: [
    // SignModule,
    NextModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wangdong123!',
      database: 'gas',
      synchronize: true,
      entities: ['dist/entities/*.js'],
      migrations: [],
      subscribers: [],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    AppModule.handleAssets(consumer);
  }

  // 注意：这里很重要，_next*是nextjs静态资源请求的前缀，这里这么处理是将静态资源相关的请求由Nest转交个Next处理
  private static handleAssets(consumer: MiddlewareConsumer): void {
    consumer.apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET
      })
  }
}
