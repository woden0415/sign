import { Sign } from './../../entities/Sign';
import { Module } from '@nestjs/common';
import { SignController } from './sign.controller';
import { SignService } from './sign.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sign])],
  controllers: [SignController],
  providers: [SignService],
})
export class SignModule { }
