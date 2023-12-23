import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '../prisma.service';
import { MembersService } from '../members/members.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService, 
    PrismaService, 
    MembersService, 
    JwtService, 
    UsersService
  ],
})
export class CompaniesModule {}
