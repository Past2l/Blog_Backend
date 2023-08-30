import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(4, 32)
  password?: string;
}
