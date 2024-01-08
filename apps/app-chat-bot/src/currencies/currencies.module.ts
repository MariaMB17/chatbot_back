import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'currencies-service',
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
  controllers: [CurrenciesController],
  providers: [JwtService],
})
export class CurrenciesModule {}
