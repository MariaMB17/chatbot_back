import { CompaniesModule } from '@Appchatbot/companies/companies.module';
import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';

@Module({
  imports: [CompaniesModule],
  controllers: [MembersController],
  providers: [MembersService, MysqlPrismaService],
})
export class MembersModule { }
