import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from '../prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [ 
    MembersService, 
    PrismaService, 
    UsersService, 
    ProfileService 
  ],
  controllers: [MembersController],
})
export class MembersModule {}
