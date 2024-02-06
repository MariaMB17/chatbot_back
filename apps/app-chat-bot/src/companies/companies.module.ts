import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { UsersService } from '../users/users.service';
import { CompaniesController } from './companies.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'company-service',
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
  controllers: [CompaniesController],
  providers: [
    JwtService,
    //UsersService
  ]
  //exports: [CompaniesService]
})
export class CompaniesModule { }
