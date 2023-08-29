import { IsIn, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDto {
  @ApiProperty()
  @IsNumber()
  order!: number;

  @ApiProperty()
  @IsIn(['text', 'image', 'video', 'code', 'link', 'file', 'html', 'markdown'])
  type!:
    | 'text'
    | 'image'
    | 'video'
    | 'code'
    | 'link'
    | 'file'
    | 'html'
    | 'markdown';

  @ApiProperty()
  @IsString()
  data!: string;
}
