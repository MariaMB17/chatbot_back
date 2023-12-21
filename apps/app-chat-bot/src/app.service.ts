import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async listarUsuarios(): Promise<string[]> {
    let arreglo: string[] = ['1', '2', '3', '4'];
    return arreglo;
  }

  async mostrarSaludo(): Promise<string> {
    return "Hello word";
  }
}
