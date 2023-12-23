import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, JwtService, UsersService],
  exports: [ProfileService]
})
export class ProfileModule {}
