
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, MysqlPrismaService],
})
export class CurrenciesModule { }
