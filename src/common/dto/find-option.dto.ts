import { IsDate, IsIn, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindOptionDto {
  @ApiProperty()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  count?: number = 5;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from?: Date = new Date(0);

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to?: Date = new Date();
}
