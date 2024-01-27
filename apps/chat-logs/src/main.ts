import { NestFactory } from '@nestjs/core';
import { ChatLogsModule } from './chat-logs.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatLogsModule);
  app.enableCors();
  await app.listen(3004);
}
bootstrap();
