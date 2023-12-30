import { Injectable } from '@nestjs/common';
import { MysqlPrismaService } from '../database/mysql-prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
}
