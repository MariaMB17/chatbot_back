import { NestFactory } from '@nestjs/core';
import { ChatLogsModule } from './chat-logs.module';

async function bootstrap() {
  const app = await NestFactory.create(ChatLogsModule);
  await app.listen(3000);
}
bootstrap();
