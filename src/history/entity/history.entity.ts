import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ nullable: false })
  platform!:
    | 'android'
    | 'ios'
    | 'ipados'
    | 'windows'
    | 'macos'
    | 'linux'
    | 'other';

  @ApiProperty()
  @Column({ nullable: false })
  ip!: string;

  @ApiProperty()
  @CreateDateColumn()
  date!: Date;
}
