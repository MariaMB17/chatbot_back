import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '../prisma.service';
import { MembersService } from '../members/members.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService, MembersService],
})
export class CompaniesModule {}
