import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { UsersService } from '../users/users.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, MysqlPrismaService, JwtService, UsersService],
  exports: [ProfileService]
})
export class ProfileModule { }
