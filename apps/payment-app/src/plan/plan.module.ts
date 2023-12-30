import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PrismaService],
})
export class PlanModule {}
