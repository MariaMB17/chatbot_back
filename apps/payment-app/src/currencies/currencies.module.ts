
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, MysqlPrismaService],
})
export class CurrenciesModule { }
