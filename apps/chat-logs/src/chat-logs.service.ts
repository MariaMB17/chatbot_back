import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatLogsService {
  getHello(): string {
    return 'Hello World!';
  }
}
