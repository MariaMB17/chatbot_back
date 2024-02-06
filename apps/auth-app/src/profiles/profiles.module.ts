import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, MysqlPrismaService],
})
export class ProfilesModule {}
