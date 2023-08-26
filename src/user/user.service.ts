import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Between, DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getWithPassword(id: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async find({
    sort = 'ASC',
    page = 1,
    count = 5,
    from = new Date(0),
    to = new Date(),
    email,
    name = '',
  }: FindUserDto): Promise<User[]> {
    return this.userRepository.find({
      order: { created: sort },
      where: {
        created: Between(from, to),
        email,
        name: Like(`%${name}%`),
      },
      skip: (page - 1) * count,
      take: count,
    });
  }

  async findWithPassword({
    sort = 'ASC',
    page = 1,
    count = 5,
    from = new Date(0),
    to = new Date(),
    email,
    name = '',
  }: FindUserDto): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.password'])
      .orderBy('created', sort)
      .limit(count)
      .offset((page - 1) * count)
      .where('user.email = :email', { email })
      .andWhere('user.name like :name', { name: `%${name}%` })
      .andWhere('user.created BETWEEN :from AND :to', { from, to })
      .getMany();
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, data);
    return await this.get(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
