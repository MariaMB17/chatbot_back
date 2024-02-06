import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'auth-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://suzhaeoo:nXe5NWVYBSnfQmXCLY2cwnAOB1xOEeSR@beaver.rmq.cloudamqp.com/suzhaeoo'
          ],
          queue: 'auth-queue',
          queueOptions: {
            durable: false,
          },
        },
      }
    ]),
  ],
  controllers: [AuthController]
})
export class AuthModule { }
