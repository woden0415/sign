import { Module } from '@nestjs/common';
import { NextService } from './next.service';
import next from 'next';

@Module({
  providers: [NextService],
  exports: [
    NextService
  ]
})
export class NextModule {
  constructor(
    private readonly nextService: NextService
  ) { }

  public async prepare(options?: any) {
    const app = next(Object.assign({
      dev: process.env.NODE_ENV !== 'production',
      dir: process.cwd(),
    }, options || {}));
    return app.prepare().then(() => this.nextService.setApp(app));
  }
}