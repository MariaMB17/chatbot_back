import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MysqlPrismaService } from 'apps/app-chat-bot/src/database/mysql-prisma.service';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5000s' },
    }),
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService, MysqlPrismaService],
})
export class AuthAppModule { }
