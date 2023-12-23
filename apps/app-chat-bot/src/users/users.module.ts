import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from '../profile/profile.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://suzhaeoo:nXe5NWVYBSnfQmXCLY2cwnAOB1xOEeSR@beaver.rmq.cloudamqp.com/suzhaeoo'
          ],
          queue: 'user-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtService, ProfileService],
  exports: [ UsersService ],
})
export class UsersModule {}
