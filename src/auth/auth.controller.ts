import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async get(@Req() req) {
    return req.user;
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto, @Res() res) {
    const result = await this.authService.signUp(user);
    const token = await this.authService.generateToken(result);
    res.cookie('Authentication', token.accessToken);
    res.send({ ...result, ...token });
  }

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Body() body: LoginUserDto, @Res() res, @Req() req) {
    const token = await this.authService.generateToken(req.user);
    res.cookie('Authentication', token.accessToken);
    res.send({ ...req.user, ...token });
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async signOut(@Req() req, @Res() res) {
    res.clearCookie('Authentication');
    return res.sendStatus(HttpStatus.OK);
  }
}
