import { Controller, Get } from '@nestjs/common';
import { ChatLogsService } from './chat-logs.service';

@Controller()
export class ChatLogsController {
  constructor(private readonly chatLogsService: ChatLogsService) {}

  @Get()
  getHello(): string {
    return this.chatLogsService.getHello();
  }
}
