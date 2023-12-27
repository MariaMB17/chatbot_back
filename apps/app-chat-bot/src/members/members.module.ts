import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from '../prisma.service';
import { ProfileService } from '../profile/profile.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ 
    MembersService, 
    PrismaService, 
    UsersService, 
    ProfileService,
    JwtService 
  ],
  controllers: [MembersController],
})
export class MembersModule {}
