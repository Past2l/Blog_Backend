import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  email!: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  name!: string;

  @ApiProperty()
  @Column({ nullable: false, select: false })
  password!: string;

  @ApiProperty()
  @Column({ default: false })
  owner!: boolean;

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
