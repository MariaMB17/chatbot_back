import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, MysqlPrismaService],
})
export class CurrenciesModule {}
