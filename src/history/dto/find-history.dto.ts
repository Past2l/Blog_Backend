import { FindOptionDto } from '../../common/dto/find-option.dto';
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindHistoryDto extends FindOptionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  post_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(['android', 'ios', 'ipados', 'windows', 'macos', 'linux', 'other'])
  platform!:
    | 'android'
    | 'ios'
    | 'ipados'
    | 'windows'
    | 'macos'
    | 'linux'
    | 'other';
}
