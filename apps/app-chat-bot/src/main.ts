import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import { AllExceptionFilter } from './allexceptionsfilter';
import { AppModule } from './app.module';
import { TransformationInterceptor } from './transformation.interceptor';


async function bootstrap() {
  console.log(process.version) 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformationInterceptor(new Reflector()));
  app.useGlobalFilters(new AllExceptionFilter());
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
  console.log('http://localhost:', port);
}
bootstrap();
