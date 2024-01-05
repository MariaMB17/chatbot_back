import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, MysqlPrismaService],
})
export class InvoicesModule {}
