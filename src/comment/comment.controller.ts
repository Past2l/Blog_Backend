import {
  Body,
  Controller,
  Delete,
  Post,
  Param,
  Patch,
  Req,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Post(':post_id')
  async create(
    @Param(':post_id') id: number,
    @Body() data: CreateCommentDto,
    @Req() req,
  ) {
    const post = await this.postService.get(!isNaN(id) ? id : 0);
    if (
      !post ||
      (post.secretEnable &&
        (!req.user ||
          (!req.user.owner &&
            !post.secret.find((user) => user.id === req.user.id))))
    )
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else if (!req?.user && (!data.name || !data.password))
      throw new HttpException(
        'Name and password are required.',
        HttpStatus.BAD_REQUEST,
      );
    else {
      const comment = await this.commentService.create({
        ...data,
        ...(data.password && {
          password: await bcrypt.hash(data.password, 10),
        }),
        ...(req?.user && {
          user: await this.userService.get(req.user.id),
        }),
      });
      post.comment.push(comment);
      await this.postService.save(post);
      return comment;
    }
  }

  @Patch(':post_id/:comment_id')
  async update(
    @Param(':post_id') post_id: number,
    @Param(':comment_id') comment_id: string,
    @Body() data: UpdateCommentDto,
    @Req() req,
  ) {
    const post = await this.postService.get(!isNaN(post_id) ? post_id : 0);
    const comment = await this.commentService.get(comment_id);
    if (
      !post ||
      (post.secretEnable &&
        (!req.user ||
          (!req.user.owner &&
            !post.secret.find((user) => user.id === req.user.id))))
    )
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else if (!post.comment.find((v) => v.id === comment_id))
      throw new HttpException(
        'Comment with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else if (!comment.ghest && req.user.id !== comment.user.id)
      throw new HttpException(
        'You do not have permission to modify Comment.',
        HttpStatus.UNAUTHORIZED,
      );
    else if (
      comment.ghest &&
      !(await bcrypt.compare(data.password, comment.password))
    )
      throw new HttpException('Password is incorrect.', HttpStatus.BAD_REQUEST);
    else return this.commentService.update(comment_id, data);
  }

  @Delete(':post_id/:comment_id')
  async remove(
    @Param(':post_id') post_id: number,
    @Param(':comment_id') comment_id: string,
    @Body() data: RemoveCommentDto,
    @Req() req,
    @Res() res,
  ) {
    const post = await this.postService.get(!isNaN(post_id) ? post_id : 0);
    const comment = await this.commentService.get(comment_id);
    if (
      !post ||
      (post.secretEnable &&
        (!req.user ||
          (!req.user.owner &&
            !post.secret.find((user) => user.id === req.user.id))))
    )
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else if (!post.comment.find((v) => v.id === comment_id))
      throw new HttpException(
        'Comment with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else if (!comment.ghest && req.user.id !== comment.user.id)
      throw new HttpException(
        'You do not have permission to remove Comment.',
        HttpStatus.UNAUTHORIZED,
      );
    else if (
      comment.ghest &&
      !(await bcrypt.compare(data.password, comment.password))
    )
      throw new HttpException('Password is incorrect.', HttpStatus.BAD_REQUEST);
    else {
      this.commentService.remove(comment_id);
      res.sendStatus(HttpStatus.OK);
    }
  }
}
