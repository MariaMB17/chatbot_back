import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'invoice-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://hjnembfy:XJcno5NBU8th88AQXW3dCxHkFWF8RgO2@woodpecker.rmq.cloudamqp.com/hjnembfy'
          ],
          queue: 'payment-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [JwtService],
})
export class InvoicesModule {}
