import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateComponentDto } from './update-component.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  editComponent?: UpdateComponentDto[] = [];

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMinSize(0)
  /** Remove Component UUID List */
  removeComponent?: string[] = [];
}
