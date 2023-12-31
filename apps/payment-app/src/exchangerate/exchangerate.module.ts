import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { ExchangerateController } from './exchangerate.controller';
import { ExchangerateService } from './exchangerate.service';

@Module({
  controllers: [ExchangerateController],
  providers: [ExchangerateService, MysqlPrismaService],
})
export class ExchangerateModule { }
