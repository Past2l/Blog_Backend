import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ComponentType } from '../../common/type/component';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDto {
  @ApiProperty()
  @IsNumber()
  order!: number;

  @ApiProperty()
  @IsEnum(ComponentType)
  type!: ComponentType;

  @ApiProperty()
  @IsString()
  data!: string;
}
