import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entity/theme.entity';
import { Repository } from 'typeorm';
import { UpdateThemeDto } from './dto/update-theme.dto';

const defaultTheme = {
  light: {
    name: 'light',
    bg1: '#F9F9F9',
    bg2: '#FCFCFC',
    bg3: '#FFFFFF',
    bg_tag: '#EEEEEE',
    text1: '#000000',
    text2: '#868E96',
    icon1:
      'invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)',
    icon2:
      'invert(59%) sepia(3%) saturate(881%) hue-rotate(169deg) brightness(94%) contrast(88%)',
    hg_text: '#1EC31E',
    hg_icon:
      'invert(41%) sepia(89%) saturate(787%) hue-rotate(81deg) brightness(116%) contrast(90%)',
  },
  dark: {
    name: 'dark',
    bg1: '#02040A',
    bg2: '#070710',
    bg3: '#0D1116',
    bg_tag: '#202020',
    text1: '#FFFFFF',
    text2: '#ACACAC',
    icon1:
      'invert(100%) sepia(80%) saturate(0%) hue-rotate(277deg) brightness(109%) contrast(101%)',
    icon2:
      'invert(70%) sepia(9%) saturate(0%) hue-rotate(258deg) brightness(98%) contrast(88%)',
    hg_text: '#78E667',
    hg_icon:
      'invert(86%) sepia(24%) saturate(1015%) hue-rotate(54deg) brightness(92%) contrast(95%)',
  },
};

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async list(): Promise<Theme[]> {
    return this.themeRepository.find();
  }

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
