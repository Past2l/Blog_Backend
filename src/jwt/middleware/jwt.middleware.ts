import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

dotenv.config();

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.Authentication || req?.header('Authentication');

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
        ) as any;
        // @ts-ignore
        req.user = await this.userRepository.findOne({
          where: { id: decoded.id },
        });
      } catch (e) {
        Logger.error(e);
      }
    }

    next();
  }
}
