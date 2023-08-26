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

  @Get(':id')
  async get(@Param('id') id: number, @Req() req) {
    const post = await this.postService.get(!isNaN(id) ? id : 0);
    if (!post || (post.private && !req.user.private))
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else return post;
  }

  @Get('')
  async find(@Query() data: FindPostDto, @Req() req) {
    return this.postService.find(data, (req.user && req.user.private) || false);
  }

  @Post('')
  async create(@Body() data: CreatePostDto, @Req() req) {
    if (!req.user || !req.user.owner)
      throw new HttpException(
        'You do not have permission to create Post.',
        HttpStatus.UNAUTHORIZED,
      );
    return this.postService.create(data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req, @Res() res) {
    if (!req.user || !req.user.owner)
      throw new HttpException(
        'You do not have permission to remove Post.',
        HttpStatus.UNAUTHORIZED,
      );
    const result = await this.postService.remove(id);
    if (result.affected < 1)
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else res.sendStatus(HttpStatus.OK);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
    @Req() req,
  ) {
    if (!req.user || !req.user.owner)
      throw new HttpException(
        'You do not have permission to modify Post.',
        HttpStatus.UNAUTHORIZED,
      );
    if (!(await this.postService.get(id)))
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else return this.postService.update(id, data);
  }
}
