import { SignModule } from './../sign/sign.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [SignModule,
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
export class AppModule { }
