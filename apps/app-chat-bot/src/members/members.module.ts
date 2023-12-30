import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UsersService } from '../users/users.service';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  providers: [
    MembersService,
    MysqlPrismaService,
    UsersService,
    ProfileService,
    JwtService
  ],
  controllers: [MembersController],
})
export class MembersModule { }
