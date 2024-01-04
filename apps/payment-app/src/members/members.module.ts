import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from '@PrismaServiceMysql';
import { CompaniesModule } from '@Appchatbot/companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
})
export class MembersModule {}