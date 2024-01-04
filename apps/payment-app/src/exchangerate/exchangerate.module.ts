import { Module } from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { ExchangerateController } from './exchangerate.controller';
import { PrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [ExchangerateController],
  providers: [ExchangerateService, PrismaService],
})
export class ExchangerateModule {}
