import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthAppService } from './auth-app.service';

interface MessageProps {
  message: string;
}

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @MessagePattern('get-hello')
  async getHello() {
    return this.authAppService.getHello();
  }

  @EventPattern('get-goodbye')
  async getGoodbye(@Payload() data: MessageProps) {
    this.authAppService.getGoodbye(data.message);
  }
}
