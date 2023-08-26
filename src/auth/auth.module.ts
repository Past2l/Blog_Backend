import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
