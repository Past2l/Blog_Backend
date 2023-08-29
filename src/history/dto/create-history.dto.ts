import { IsIP, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
