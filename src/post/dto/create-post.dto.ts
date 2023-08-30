import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateComponentDto } from './create-component.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  secretEnable: boolean = false;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  secret: string[] = [];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  commentEnable: boolean = true;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(0)
  component!: CreateComponentDto[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  tag!: string[];
}
