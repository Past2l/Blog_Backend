import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Component } from './component.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';

@Entity('post')
export class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty()
  @Column({ nullable: false })
  title!: string;

  @ApiProperty()
  @Column({ default: false })
  secret?: boolean = false;

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable({ name: 'post_secret_user' })
  secret_user?: User[];

  @ApiProperty()
  @OneToMany(() => Component, (component) => component.post, { cascade: true })
  component!: Component[];

  @ApiProperty()
  @Column({ type: 'longtext', nullable: false })
  tag!: string;

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
