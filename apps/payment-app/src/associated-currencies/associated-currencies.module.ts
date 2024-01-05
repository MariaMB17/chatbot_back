import { Module } from '@nestjs/common';
import { AssociatedCurrenciesService } from './associated-currencies.service';
import { AssociatedCurrenciesController } from './associated-currencies.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [AssociatedCurrenciesController],
  providers: [AssociatedCurrenciesService, MysqlPrismaService],
})
export class AssociatedCurrenciesModule {}
