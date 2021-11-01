/* eslint-disable import/no-cycle */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';

@Entity('m_user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: '128' })
  displayName!: string;

  @Column({ type: 'varchar', length: '255', unique: true })
  email!: string;

  @Column({ type: 'varchar', length: '255' })
  password!: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
