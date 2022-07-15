import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ComposeByTime } from './compose/ComposeByTime';

export enum EnumSignStatus {
  initial = 'initial',
  signing = 'doing',
  done = 'done'
}

@Entity('sign')
export class Sign {
  @PrimaryGeneratedColumn('increment', { comment: '签字id, 自动增加' })
  id: number;

  @Column({ nullable: true, comment: '签字的内容,base64存储' })
  content: string;

  @Column({ type: 'enum', default: EnumSignStatus.initial, enum: EnumSignStatus, comment: '状态, initial初始化, signing签字中, done签字完成' })
  status: EnumSignStatus

  @Column({ name: 'create_by', comment: '创建人' })
  createBy: string;

  @CreateDateColumn({ name: 'create_time', type: 'datetime', comment: '创建时间' })
  createdTime: Date;

  @Column({ name: 'update_by', comment: '更新人' })
  updateBy: string;

  @UpdateDateColumn({ name: 'update_time', type: 'datetime', comment: '更新时间' })
  updateTime: Date;
}
