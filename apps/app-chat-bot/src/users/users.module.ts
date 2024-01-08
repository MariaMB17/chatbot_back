import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'user-service',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://hjnembfy:XJcno5NBU8th88AQXW3dCxHkFWF8RgO2@woodpecker.rmq.cloudamqp.com/hjnembfy'
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
  providers: [
    UsersService,
    MysqlPrismaService,
    JwtService,
    ProfileService],
  exports: [UsersService],
})
export class UsersModule { }
