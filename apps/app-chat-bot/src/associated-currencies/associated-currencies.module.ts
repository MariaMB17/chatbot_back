import { Module } from '@nestjs/common';
import { AssociatedCurrenciesController } from './associated-currencies.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'associated-currency-service',
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
  controllers: [AssociatedCurrenciesController],
  providers: [JwtService],
})
export class AssociatedCurrenciesModule {}
