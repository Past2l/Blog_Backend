import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ComponentType } from '../../common/type/component';
import { Post } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('component')
export class Component {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.component, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ApiProperty()
  @Column({ nullable: false })
  order!: number;

  @ApiProperty()
  @Column({ type: 'enum', nullable: false, enum: ComponentType })
  type!: ComponentType;

  @ApiProperty()
  @Column({ type: 'longtext', nullable: false })
  data!: string;

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
