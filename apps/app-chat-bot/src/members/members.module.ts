import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'member-service',
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
  controllers: [MembersController],
  providers: [MembersService, JwtService],
})
export class MembersModule { }
