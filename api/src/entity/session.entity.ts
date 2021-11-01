/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('t_user_session')
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: '128' })
  userAgent!: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
