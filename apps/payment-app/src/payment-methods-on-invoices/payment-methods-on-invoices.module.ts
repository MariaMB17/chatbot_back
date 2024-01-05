import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';

@Module({
  controllers: [PaymentMethodsOnInvoicesController],
  providers: [PaymentMethodsOnInvoicesService, MysqlPrismaService],
})
export class PaymentMethodsOnInvoicesModule { }
