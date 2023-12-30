import { Module } from '@nestjs/common';
import { MongoPrismaService } from './mongo-prisma.service';
import { MysqlPrismaService } from './mysql-prisma.service';

@Module({
  providers: [MysqlPrismaService, MongoPrismaService],
})
export class DatabaseModule {}
