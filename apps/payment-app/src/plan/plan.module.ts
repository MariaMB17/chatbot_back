import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MysqlPrismaService } from 'apps/app-chat-bot/src/database/mysql-prisma.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, MysqlPrismaService],
})
export class PlanModule {}
