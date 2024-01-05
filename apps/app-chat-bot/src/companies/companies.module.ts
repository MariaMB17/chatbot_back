import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { MembersService } from '../members/members.service';
import { ProfileModule } from '../profile/profile.module';
import { UsersService } from '../users/users.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [ProfileModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    MysqlPrismaService,
    MembersService,
    JwtService,
    UsersService
  ],
  exports: [CompaniesService]
})
export class CompaniesModule { }
