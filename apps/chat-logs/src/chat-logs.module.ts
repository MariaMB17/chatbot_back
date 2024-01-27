import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module';
import { ChatController } from './chat-logs.controller';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [ChatModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatLogsModule {}
