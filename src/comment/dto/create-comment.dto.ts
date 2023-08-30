import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(2, 16)
  name: string = '익명';

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(4, 32)
  password?: string;
}
