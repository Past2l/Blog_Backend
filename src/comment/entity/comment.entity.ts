import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty()
  @Column({ nullable: false })
  ghest!: boolean;

  @ApiProperty()
  @ManyToOne(() => User)
  user?: User;

  @ApiProperty()
  @Column({ nullable: true, default: '익명' })
  name!: string;

  @ApiProperty()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty()
  @Column({ type: 'longtext', nullable: false })
  content!: string;

  @ApiProperty()
  @Column({ nullable: false })
  ip!: string;

  @ApiProperty()
  @CreateDateColumn()
  created!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated!: Date;
}
