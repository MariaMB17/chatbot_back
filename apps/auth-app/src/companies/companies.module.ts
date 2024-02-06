import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, MysqlPrismaService],
})
export class CompaniesModule {}
