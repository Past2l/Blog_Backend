import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entity/history.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { FindHistoryDto } from './dto/find-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async get(id: string): Promise<History> {
    return this.historyRepository.findOne({ where: { id } });
  }

  async find({
    sort,
    page,
    count,
    from,
    to,
    ip,
    post_id,
    user_id,
  }: FindHistoryDto): Promise<History[]> {
    return this.historyRepository.find({
      order: { date: sort },
      where: {
        date: Between(from, to),
        post_id,
        user_id,
        ...(ip && { ip: Like(`%${ip}%`) }),
      },
      skip: (page - 1) * count,
      take: count,
    });
  }

  async create(data: CreateHistoryDto): Promise<History> {
    return this.historyRepository.create(data);
  }
}
