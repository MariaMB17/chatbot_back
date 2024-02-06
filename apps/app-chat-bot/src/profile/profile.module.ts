import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileController } from './profile.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'profile-service',
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
  controllers: [ProfileController],
  providers: [JwtService],
})
export class ProfileModule { }
