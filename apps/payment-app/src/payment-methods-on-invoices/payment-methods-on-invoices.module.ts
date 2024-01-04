import { Module } from '@nestjs/common';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';
import { PrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [PaymentMethodsOnInvoicesController],
  providers: [PaymentMethodsOnInvoicesService, PrismaService],
})
export class PaymentMethodsOnInvoicesModule {}
