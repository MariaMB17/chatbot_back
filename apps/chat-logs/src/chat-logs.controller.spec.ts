import { Test, TestingModule } from '@nestjs/testing';
import { ChatLogsController } from './chat-logs.controller';
import { ChatLogsService } from './chat-logs.service';

describe('ChatLogsController', () => {
  let chatLogsController: ChatLogsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatLogsController],
      providers: [ChatLogsService],
    }).compile();

    chatLogsController = app.get<ChatLogsController>(ChatLogsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatLogsController.getHello()).toBe('Hello World!');
    });
  });
});
