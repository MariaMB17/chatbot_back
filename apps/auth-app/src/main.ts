import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthAppModule } from './auth-app.module';

//https://api.cloudamqp.com/console/3e599343-2234-42fa-99be-e503b35a036c/details

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthAppModule,
    {
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
