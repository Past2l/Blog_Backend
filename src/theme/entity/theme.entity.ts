import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('theme')
export class Theme {
  @ApiProperty()
  @PrimaryColumn()
  name!: string;

  @ApiProperty()
  @Column({ nullable: false })
  bg1!: string;

  @ApiProperty()
  @Column({ nullable: false })
  bg2!: string;

  @ApiProperty()
  @Column({ nullable: false })
  bg3!: string;

  @ApiProperty()
  @Column({ nullable: false })
  bg_tag!: string;

  @ApiProperty()
  @Column({ nullable: false })
  text1!: string;

  @ApiProperty()
  @Column({ nullable: false })
  text2!: string;

  @ApiProperty()
  @Column({ nullable: false })
  icon1!: string;

  @ApiProperty()
  @Column({ nullable: false })
  icon2!: string;

  @ApiProperty()
  @Column({ nullable: false })
  hg_text!: string;

  @ApiProperty()
  @Column({ nullable: false })
  hg_icon!: string;
}
