import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
<<<<<<< HEAD
import { MysqlPrismaService } from 'apps/app-chat-bot/src/database/mysql-prisma.service';
=======
import { PrismaService } from '@PrismaServiceMysql';
>>>>>>> main

@Module({
  controllers: [PlanController],
  providers: [PlanService, MysqlPrismaService],
})
export class PlanModule {}
