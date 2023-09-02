import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('theme')
export class Theme {
  @ApiProperty()
  @PrimaryColumn()
  name!: string;

  @ApiProperty()
  @Column({ nullable: false })
  background!: string;

  @ApiProperty()
  @Column({ nullable: false })
  input_background!: string;

  @ApiProperty()
  @Column({ nullable: false })
  highlight_background!: string;

  @ApiProperty()
  @Column({ nullable: false })
  text!: string;

  @ApiProperty()
  @Column({ nullable: false })
  hightligth_text!: string;

  @ApiProperty()
  @Column({ nullable: false })
  svg!: string;

  @ApiProperty()
  @Column({ nullable: false })
  highligth_svg!: string;
}
