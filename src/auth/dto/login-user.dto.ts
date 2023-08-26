import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 32)
  password: string;
}
