import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, MysqlPrismaService],
})
export class UsersModule {}
