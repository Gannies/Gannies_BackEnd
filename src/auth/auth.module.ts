import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { RedisModule } from 'src/common/redis.module';
import { AuthPasswordService, AuthSessionService, AuthSignInService, AuthUserService } from './services/index';
import { LoginsEntity } from './entities/logins.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session-serializer';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import Redis from 'ioredis';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, LoginsEntity]), RedisModule, ConfigModule, EmailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUserService,
    AuthPasswordService,
    AuthSignInService,
    AuthSessionService,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
