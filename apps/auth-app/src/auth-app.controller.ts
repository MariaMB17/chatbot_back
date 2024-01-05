import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AuthAppService } from './auth-app.service';
import { createAuthDto } from './dtos/login.dto';

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
 
  @EventPattern('evt-login')
  async evtLogin(@Payload() data) {
    return this.authAppService.evtLogin(data.id,data);
  }
}
