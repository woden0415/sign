import { SignDto } from './dto/Sign.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { SignService } from "./sign.service";

@Controller("sign")
export class SignController {

  constructor(private readonly signService: SignService) { }

  // 插入一条记录，返回一个记录id
  @Post("/insert")
  async insert(): Promise<number> {
    const resp = await this.signService.insert();
    return resp;
  }

  // 更新返回这个对象
  @Post("/update")
  update(@Body() signDto: SignDto): any {
    return this.signService.update(signDto);
  }

  @Post("/find/one")
  findOne(@Body() signDto: SignDto) {
    return this.signService.findOne(signDto.id);
  }

  // 逻辑删除
  @Post("/delete")
  delete(): any {
    // return this.signService.update();
  }
}
