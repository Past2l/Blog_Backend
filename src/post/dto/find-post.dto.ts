import { FindOptionDto } from '../../common/dto/find-option.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindPostDto extends FindOptionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string = '';

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (value != '' ? value.split(',') : []))
  tag?: string[] = [];
}
