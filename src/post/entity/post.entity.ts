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
import { User } from '../../user/entity/user.entity';
import { Comment } from '../../comment/entity/comment.entity';

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
  secretEnable?: boolean = false;

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable({ name: 'post_secret' })
  secret?: User[];

  @ApiProperty()
  @OneToMany(() => Component, (component) => component.post, { cascade: true })
  component!: Component[];

  @ApiProperty()
  @Column({ type: 'longtext', nullable: false })
  tag!: string;

  @ApiProperty()
  @Column({ default: true })
  commentEnable?: boolean = true;

  @ApiProperty()
  @ManyToMany(() => Comment)
  @JoinTable({ name: 'post_comment' })
  comment: Comment[];

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
