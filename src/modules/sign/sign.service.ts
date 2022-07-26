import { EnumSignStatus, Sign } from './Sign.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignDto } from './dto/Sign.dto';


@Injectable()
export class SignService {

  constructor(
    @InjectRepository(Sign)
    private signRepository: Repository<Sign>,
  ) { }

  async insert(): Promise<Sign> {
    const _sign = new Sign();
    _sign.createBy = 'admin'
    _sign.updateBy = 'admin'
    const resp = await this.signRepository.save(_sign)
    return resp
  }

  async findOne(id: number): Promise<Sign> {
    const _sign = await this.signRepository.findOneBy({ id })
    return _sign
  }

  async update(signDto: SignDto): Promise<Sign> {
    const _sign = await this.signRepository.findOneBy({ id: signDto.id })
    if (!_sign) throw new Error('当前用户查询不存在');
    _sign.status = EnumSignStatus.done
    _sign.content = signDto.content
    return this.signRepository.save(_sign);
  }
}
