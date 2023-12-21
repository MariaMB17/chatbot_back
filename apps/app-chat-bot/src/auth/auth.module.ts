import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

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
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
