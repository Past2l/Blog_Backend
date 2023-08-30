import { ApiProperty } from '@nestjs/swagger';
import { FindOptionDto } from '../../common/dto/find-option.dto';
import { IsOptional, IsString } from 'class-validator';

export class FindCommentDto extends FindOptionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string = '';

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string = '';
}
