import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Component } from './entity/component.entity';
import { HistoryModule } from '../history/history.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Component]),
    UserModule,
    HistoryModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
