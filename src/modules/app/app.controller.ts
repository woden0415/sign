import { Controller, Get, Req, Res } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { NextService } from '../next/next.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly next: NextService
  ) { }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pc')
  getPc(@Req() req, @Res() res) {
    // 把原本由Nest处理的主页转交给next
    return this.next.render("/pc", req, res);
  }

  @Get('/mobile')
  getMobile(@Req() req, @Res() res) {
    // 把原本由Nest处理的主页转交给next
    return this.next.render("/mobile", req, res);
  }
}
