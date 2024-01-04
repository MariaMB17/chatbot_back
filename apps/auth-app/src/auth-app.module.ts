import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { PrismaService } from '@Appchatbot/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5000s' },
    }),
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService, PrismaService],
})
export class AuthAppModule {}
