import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../../common/type/platform';

@Entity('history')
export class History {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column({ nullable: false })
  post_id!: number;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  user_id?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: Platform, nullable: false })
  platform!: Platform;

  @ApiProperty()
  @Column({ nullable: false })
  ip!: string;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;
}
