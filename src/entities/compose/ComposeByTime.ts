/**
 * @description 通用的创建人、创建时间、更新人、更新时间
 */
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class ComposeByTime {
  @Column({ name: 'create_by', comment: '创建人' })
  createBy: string;

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createdTime: Date;

  @Column({ name: 'update_by', comment: '更新人' })
  updateBy: string;

  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  updateTime: Date;
}
