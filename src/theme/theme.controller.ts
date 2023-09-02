import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThemeService } from './theme.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateThemeDto } from './dto/update-theme.dto';

@ApiTags('theme')
@Controller('theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get(':name')
  async get(@Param('name') name: string) {
    return this.themeService.get(name == 'dark' ? 'dark' : 'light');
  }

  @Patch(':name')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('name') name: string, theme: UpdateThemeDto, @Req() req) {
    if (!req.owner)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return this.themeService.update(name == 'dark' ? 'dark' : 'light', theme);
  }

  @Get(':name/reset')
  @UseGuards(AuthGuard('jwt'))
  async reset(@Param('name') name: string, @Req() req) {
    if (!req.owner)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    return this.themeService.reset(name == 'dark' ? 'dark' : 'light');
  }
}
