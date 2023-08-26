import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Unique } from 'typeorm';
import { User } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @Validate(Unique, [User])
  email!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 16)
  @Validate(Unique, [User])
  name!: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  password!: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  private: boolean = false;
}
