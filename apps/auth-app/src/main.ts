import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

//https://api.cloudamqp.com/console/3e599343-2234-42fa-99be-e503b35a036c/details

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://hjnembfy:XJcno5NBU8th88AQXW3dCxHkFWF8RgO2@woodpecker.rmq.cloudamqp.com/hjnembfy'
        ],
        queue: 'auth-queue',
        queueOptions: {
          durable: false,
        },
      },
    },/*{
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://suzhaeoo:nXe5NWVYBSnfQmXCLY2cwnAOB1xOEeSR@##beaver.rmq.cloudamqp.com/suzhaeoo'
        ],
        queue: 'users-queue',
        queueOptions: {
          durable: false,
        },
      },
    },*/
);
  await app.listen();
}
bootstrap();
