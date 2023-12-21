import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async listarUsuarios(): Promise<string[]> {
   return await this.appService.listarUsuarios();
  }

  @Post('/')
  async mostrarSaludo(): Promise<string> {
    return await this.appService.mostrarSaludo();
  }
}
