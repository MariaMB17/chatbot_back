import { Module } from '@nestjs/common';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'paymentMethodsOnInvoices-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://suzhaeoo:nXe5NWVYBSnfQmXCLY2cwnAOB1xOEeSR@beaver.rmq.cloudamqp.com/suzhaeoo'
          ],
          queue: 'payment-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PaymentMethodsOnInvoicesController],
  providers: [JwtService],
})
export class PaymentMethodsOnInvoicesModule {}
