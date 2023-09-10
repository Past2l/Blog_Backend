import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateThemeDto {
  @IsOptional()
  @IsHexColor()
  bg1?: string;

  @IsOptional()
  @IsHexColor()
  bg2?: string;

  @IsOptional()
  @IsHexColor()
  bg3?: string;

  @IsOptional()
  @IsHexColor()
  bg_tag?: string;

  @IsOptional()
  @IsHexColor()
  text1?: string;

  @IsOptional()
  @IsHexColor()
  text2?: string;

  @IsOptional()
  @IsString()
  icon1?: string;

  @IsOptional()
  @IsString()
  icon2?: string;

  @IsOptional()
  @IsHexColor()
  hg_text: string;

  @IsOptional()
  @IsString()
  hg_icon?: string;
}
