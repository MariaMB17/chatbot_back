import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Module } from '@nestjs/common';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';

@Module({
  controllers: [PaymentMethodsOnInvoicesController],
  providers: [PaymentMethodsOnInvoicesService, MysqlPrismaService],
})
export class PaymentMethodsOnInvoicesModule { }
