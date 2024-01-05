import { Module } from '@nestjs/common';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [PaymentMethodsOnInvoicesController],
  providers: [PaymentMethodsOnInvoicesService, MysqlPrismaService],
})
export class PaymentMethodsOnInvoicesModule {}
