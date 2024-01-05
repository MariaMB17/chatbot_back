import { Module } from '@nestjs/common';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

@Module({
  controllers: [BotsController],
  providers: [
    BotsService,
    MysqlPrismaService
  ],
})
export class BotsModule { }
