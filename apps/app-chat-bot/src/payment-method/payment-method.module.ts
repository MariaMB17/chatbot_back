import { Module } from '@nestjs/common';
import { PaymentMethodController } from './payment-method.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'payment-method-service',
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
  controllers: [PaymentMethodController],
  providers: [JwtService],
})
export class PaymentMethodModule {}
