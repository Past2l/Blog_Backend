import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddlewareModule } from './jwt/jwt-middleware.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    JwtMiddlewareModule,
    AuthModule,
    UserModule,
    HistoryModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
