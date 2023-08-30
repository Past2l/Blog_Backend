import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIP, IsOptional, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsBoolean()
  ghest!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 16)
  name: string = '익명';

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(4, 32)
  password?: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsIP()
  ip!: string;
}
