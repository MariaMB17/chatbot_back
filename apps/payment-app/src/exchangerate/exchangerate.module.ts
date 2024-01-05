import { Module } from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { ExchangerateController } from './exchangerate.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [ExchangerateController],
  providers: [ExchangerateService, MysqlPrismaService],
})
export class ExchangerateModule {}
