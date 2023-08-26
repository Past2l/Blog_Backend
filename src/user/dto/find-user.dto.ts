import { FindOptionDto } from '../../common/dto/find-option.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDto extends FindOptionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string = '';
}
