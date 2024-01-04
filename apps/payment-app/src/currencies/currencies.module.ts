import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { PrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, PrismaService],
})
export class CurrenciesModule {}
