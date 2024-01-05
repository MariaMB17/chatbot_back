import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [PlanController],
  providers: [PlanService, MysqlPrismaService],
})
export class PlanModule {}
