import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { JwtService } from '@nestjs/jwt';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UsersService } from '../users/users.service';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  providers: [
    MembersService,
    MysqlPrismaService,
    UsersService,
    ProfileService,
    JwtService
=======
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
>>>>>>> main
  ],
  controllers: [MembersController],
  providers: [MembersService, JwtService],
})
export class MembersModule { }
