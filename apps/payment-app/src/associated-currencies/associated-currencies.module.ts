import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { AssociatedCurrenciesController } from './associated-currencies.controller';
import { AssociatedCurrenciesService } from './associated-currencies.service';

@Module({
  controllers: [AssociatedCurrenciesController],
  providers: [AssociatedCurrenciesService, MysqlPrismaService],
})
export class AssociatedCurrenciesModule { }
