import { Sign } from './../sign/Sign.entity';
import { SignModule } from './../sign/sign.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextModule } from '../next/next.module';
import { NextMiddleware } from '../next/next.middleware';
import { ConfigModule } from '@nestjs/config'

console.log(process.env.environment + "__")
const db = {
  development: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'wangdong',
    database: 'woden0415',
    synchronize: true,
    entities: [Sign],
    migrations: [],
    subscribers: [],
  },
  production: {
    type: 'mysql',
    host: 'mysql.sqlpub.com',
    port: 3306,
    username: 'woden0415',
    password: 'g9YL0rJs3ozDdxoF',
    database: 'woden0415',
    synchronize: true,
    entities: [Sign],
    migrations: [],
    subscribers: [],
  }
}
@Module({
  imports: [
    SignModule,
    NextModule,
    TypeOrmModule.forRoot(db[process.env.environment]),
    ConfigModule.forRoot()
  ],
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
