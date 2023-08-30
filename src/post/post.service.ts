import { Between, DeleteResult, Like, Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entity/component.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostDto } from './dto/find-post.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
    private readonly userService: UserService,
  ) {}

  async get(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['component', 'secret_user'],
    });
  }

  async find(
    { sort, page, count, from, to, title, tag }: FindPostDto,
    user_id?: string,
    owner?: string,
  ): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['component', 'secret_user'],
      order: { created: sort },
      where: [
        {
          title: Like(`%${title}%`),
          created: Between(from, to),
          ...(tag.length > 0 && { tag: Like(`%"${tag.join('"%%"')}"%`) }),
          ...(!owner && { secretEnable: false }),
        },
        !owner && {
          title: Like(`%${title}%`),
          created: Between(from, to),
          ...(tag.length > 0 && { tag: Like(`%"${tag.join('"%%"')}"%`) }),
          secretEnable: true,
          secret: { id: user_id || '' },
        },
      ],
      skip: (page - 1) * count,
      take: count,
    });
  }

  async create({
    title,
    component,
    tag,
    secretEnable,
    secret,
    commentEnable,
  }: CreatePostDto): Promise<Post> {
    const components: Component[] = [];
    const accesses: User[] = [];
    if (secretEnable)
      for (const uid of secret) {
        const user = await this.userService.get(uid);
        if (user) accesses.push(user);
      }
    for (const c of component) {
      const data = this.componentRepository.create(c);
      components.push(await this.componentRepository.save(data));
    }
    const post = this.postRepository.create({
      title,
      secretEnable,
      commentEnable,
      secret: accesses,
      component: components,
      tag: JSON.stringify(tag),
    });
    return this.postRepository.save(post);
  }

  async update(
    id: number,
    {
      title,
      secretEnable,
      commentEnable,
      secret,
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
    post.secretEnable = secretEnable;
    post.commentEnable = commentEnable;
    post.secret = [];
    if (secretEnable)
      for (const uid of secret) {
        const user = await this.userService.get(uid);
        if (user) post.secret.push(user);
      }
    if (title) post.title = title;
    post.tag = JSON.stringify(tag);
    if (component)
      for (const c of component) {
        const data = this.componentRepository.create(c);
        post.component.push(await this.componentRepository.save(data));
      }
    post.component.sort((a, b) => a.order - b.order);
    post.updated = new Date();
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.postRepository.delete(id);
  }
}
