import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentAppModule } from './payment-app.module';

//https://api.cloudamqp.com/console/3e599343-2234-42fa-99be-e503b35a036c/details

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentAppModule,
    {
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
);
  await app.listen();
}
bootstrap();
