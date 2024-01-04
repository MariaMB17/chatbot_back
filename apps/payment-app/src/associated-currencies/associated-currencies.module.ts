import { Module } from '@nestjs/common';
import { AssociatedCurrenciesService } from './associated-currencies.service';
import { AssociatedCurrenciesController } from './associated-currencies.controller';
import { PrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [AssociatedCurrenciesController],
  providers: [AssociatedCurrenciesService, PrismaService],
})
export class AssociatedCurrenciesModule {}
