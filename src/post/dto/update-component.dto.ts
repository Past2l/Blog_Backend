import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateComponentDto } from './create-component.dto';
import { IsUUID } from 'class-validator';

export class UpdateComponentDto extends PartialType(CreateComponentDto) {
  @ApiProperty()
  @IsUUID()
  id!: string;
}
