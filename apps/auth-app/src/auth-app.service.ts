import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthAppService {
  async getHello(): Promise<string> {
    return 'Hello World! desde mensaje';
  }

  async getGoodbye(message: string): Promise<void> {
    console.log(message);
  }
}
