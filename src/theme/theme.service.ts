import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entity/theme.entity';
import { Repository } from 'typeorm';
import { UpdateThemeDto } from './dto/update-theme.dto';

const defaultTheme = {
  light: {
    name: 'light',
    background: '#ffffff',
    input_background: '#ffffff',
    highlight_background: '#80FF80',
    text: '#000000',
    hightligth_text: '#80FF80',
    svg: 'invert(0%) sepia(1%) saturate(7472%) hue-rotate(63deg) brightness(114%) contrast(99%)',
    highligth_svg:
      'invert(99%) sepia(43%) saturate(1981%) hue-rotate(49deg) brightness(96%) contrast(111%)',
  },
  dark: {
    name: 'dark',
    background: '#000000',
    input_background: '#202020',
    highlight_background: '#308030',
    text: '#ffffff',
    hightligth_text: '#308030',
    svg: 'invert(100%) sepia(8%) saturate(7058%) hue-rotate(189deg) brightness(106%) contrast(114%)',
    highligth_svg:
      'invert(40%) sepia(9%) saturate(3740%) hue-rotate(71deg) brightness(95%) contrast(78%)',
  },
};

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async get(name: 'light' | 'dark'): Promise<Theme> {
    const theme = await this.themeRepository.findOneBy({ name });
    return theme || this.themeRepository.save(defaultTheme[name]);
  }

  async update(name: 'light' | 'dark', theme: UpdateThemeDto): Promise<Theme> {
    await this.themeRepository.update(name, theme);
    return this.get(name);
  }

  async reset(name: 'light' | 'dark'): Promise<Theme> {
    await this.themeRepository.update(
      name,
      name == 'light' ? defaultTheme.light : defaultTheme.dark,
    );
    return this.get(name);
  }
}
