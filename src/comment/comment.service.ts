import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Like, Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { FindCommentDto } from './dto/find-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async get(id: string): Promise<Comment> {
    return this.commentRepository
      .createQueryBuilder('comment')
      .addSelect(['comment.password'])
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id })
      .getOne();
  }

  async find({
    sort = 'ASC',
    page = 1,
    count = 5,
    from = new Date(0),
    to = new Date(),
    name = '',
    content = '',
  }: FindCommentDto): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['user'],
      order: { created: sort },
      where: {
        created: Between(from, to),
        name: Like(`%${name}%`),
        content: Like(`%${content}%`),
      },
      skip: (page - 1) * count,
      take: count,
    });
  }

  async create(
    data: CreateCommentDto & { ip: string; ghest: boolean },
  ): Promise<Comment> {
    return this.commentRepository.save(data);
  }

  async update(id: string, data: UpdateCommentDto): Promise<Comment> {
    await this.commentRepository.update(id, data);
    const comment = await this.get(id);
    comment.password = undefined;
    return comment;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.commentRepository.delete(id);
  }
}
