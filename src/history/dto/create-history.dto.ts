import { IsEnum, IsIP, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../../common/type/platform';

export class CreateHistoryDto {
  @ApiProperty()
  @IsIP()
  ip!: string;

  @ApiProperty()
  @IsNumber()
  post_id!: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @ApiProperty()
  @IsEnum(Platform)
  platform!: Platform;
}
