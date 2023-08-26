import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() data: UpdateUserDto, @Req() req) {
    return await this.userService.update(req.user.id, data);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Req() req, @Res() res) {
    await this.userService.remove(req.user.id);
    res.sendStatus(HttpStatus.OK);
  }
}
