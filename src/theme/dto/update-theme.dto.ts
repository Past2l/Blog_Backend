import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateThemeDto {
  @IsOptional()
  @IsHexColor()
  background?: string;

  @IsOptional()
  @IsHexColor()
  input_background?: string;

  @IsOptional()
  @IsHexColor()
  highlight_background?: string;

  @IsOptional()
  @IsHexColor()
  text?: string;

  @IsOptional()
  @IsHexColor()
  hightligth_text?: string;

  @IsOptional()
  @IsString()
  svg?: string;

  @IsOptional()
  @IsString()
  highligth_svg?: string;
}
