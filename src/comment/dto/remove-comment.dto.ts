import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RemoveCommentDto {
  @ApiProperty()
  @IsString()
  @Length(4, 32)
  password?: string;
}
