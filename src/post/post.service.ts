import { Between, DeleteResult, Like, Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entity/component.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostDto } from './dto/find-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
  ) {}

  async get(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['component'],
    });
  }

  async find(
    { sort, page, count, from, to, title, tag }: FindPostDto,
    canPrivate: boolean,
  ): Promise<Post[]> {
    const post: Post[] = [];
    const find = await this.postRepository.find({
      relations: ['component'],
      order: { created: sort },
      where: {
        title: Like(`%${title}%`),
        ...(!canPrivate && { private: false }),
        created: Between(from, to),
        ...(tag.length > 0 && { tag: Like(`%"${tag.join('"%%"')}"%`) }),
      },
      skip: (page - 1) * count,
      take: count,
    });
    for (const p of find) post.push(await this.get(p.id));
    return post;
  }

  async create({
    title,
    component,
    tag,
    isPrivate,
  }: CreatePostDto): Promise<Post> {
    const components: Component[] = [];
    for (const c of component) {
      const data = this.componentRepository.create(c);
      components.push(await this.componentRepository.save(data));
    }
    const post = this.postRepository.create({
      title,
      private: isPrivate,
      component: components,
      tag: JSON.stringify(tag),
    });
    return this.postRepository.save(post);
  }

  async update(
    id: number,
    {
      title,
      isPrivate,
      component,
      editComponent,
      removeComponent,
      tag,
    }: UpdatePostDto,
  ): Promise<Post> {
    for (const c of editComponent)
      await this.componentRepository.update(c.id, c);
    for (const id of removeComponent) await this.componentRepository.delete(id);
    const post = await this.get(id);
    post.private = isPrivate;
    post.title = title;
    post.tag = JSON.stringify(tag);
    for (const c of component) {
      const data = this.componentRepository.create(c);
      post.component.push(await this.componentRepository.save(data));
    }
    post.component.sort((a, b) => a.order - b.order);
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
