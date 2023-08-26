import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [JwtMiddleware],
})
export class JwtMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
