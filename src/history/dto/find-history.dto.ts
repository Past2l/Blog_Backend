import { FindOptionDto } from '../../common/dto/find-option.dto';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../../common/type/platform';
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
  @IsEnum(Platform)
  platform?: Platform;
}
