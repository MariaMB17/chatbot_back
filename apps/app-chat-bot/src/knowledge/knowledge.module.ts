import { Module } from '@nestjs/common';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

@Module({
  controllers: [KnowledgeController],
  providers: [
    KnowledgeService,
    MysqlPrismaService
  ],
})
export class KnowledgeModule { }
