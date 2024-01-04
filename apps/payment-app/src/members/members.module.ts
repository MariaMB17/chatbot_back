import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';
import { CompaniesService } from 'apps/app-chat-bot/src/companies/companies.service';
import { CompaniesModule } from 'apps/app-chat-bot/src/companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
})
export class MembersModule {}
