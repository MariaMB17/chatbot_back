import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import { AllExceptionFilter } from './allexceptionsfilter';
import { AppModule } from './app.module';
import { TransformationInterceptor } from './transformation.interceptor';
import * as cors from 'cors';

async function bootstrap() {
  console.log(process.version) 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformationInterceptor(new Reflector()));
  app.useGlobalFilters(new AllExceptionFilter());

  //habilita CORS para todas las rutas y para todos los orígenes.
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000,
      },
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(port);
}
bootstrap();
