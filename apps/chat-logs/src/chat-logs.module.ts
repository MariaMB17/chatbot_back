import { Module } from '@nestjs/common';
import { ChatLogsController } from './chat-logs.controller';
import { ChatLogsService } from './chat-logs.service';

@Module({
  imports: [],
  controllers: [ChatLogsController],
  providers: [ChatLogsService],
})
export class ChatLogsModule {}
