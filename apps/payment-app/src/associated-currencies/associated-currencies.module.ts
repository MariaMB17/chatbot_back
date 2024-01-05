import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { AssociatedCurrenciesController } from './associated-currencies.controller';

@Module({
  controllers: [AssociatedCurrenciesController],
  providers: [AssociatedCurrenciesService, MysqlPrismaService],
})
export class AssociatedCurrenciesModule { }
