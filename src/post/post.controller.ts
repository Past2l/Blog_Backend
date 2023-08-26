import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostDto } from './dto/find-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('ip')
  async ip(@Req() req) {
    return req.headers['X-Real-IP'];
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const post = await this.postService.get(!isNaN(id) ? id : 0);
    if (!post)
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else return post;
  }

  @Get('')
  async find(@Query() data: FindPostDto) {
    return this.postService.find(data);
  }

  @Post('')
  async create(@Body() data: CreatePostDto) {
    return this.postService.create(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res) {
    const result = await this.postService.remove(id);
    if (result.affected < 1)
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else res.sendStatus(HttpStatus.OK);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdatePostDto) {
    if (!(await this.postService.get(id)))
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else return this.postService.update(id, data);
  }
}
