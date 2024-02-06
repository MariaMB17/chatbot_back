import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/mysql/client';
import { MysqlPrismaService } from './database/mysql-prisma.service';

@Injectable()
export class AppService /*implements OnModuleInit*/ {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  /*async onModuleInit() {
    try {
      const planExists = await this.prismaService.plan.findUnique({
        where: { name: "Free" },
      });

      if (!planExists) {
        await this.prismaService.plan.create({
          data: {
            name: "Free",
            description: "Free Plan",
            cost: 0,
            credits: 250,
            bots: 3,
            documents: 1000,
            members: 3
          },
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
        console.log("La tabla no existe...");
      } else {
        throw error;
      }
    }
  }*/

  async listarUsuarios(): Promise<string[]> {
    let arreglo: string[] = ['1', '2', '3', '4'];
    return arreglo;
  }

  async mostrarSaludo(): Promise<string> {
    return "Hello word";
  }
}
