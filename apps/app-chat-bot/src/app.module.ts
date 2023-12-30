import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { CompaniesModule } from './companies/companies.module';
import { MembersModule } from './members/members.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ProfileModule, 
    CompaniesModule, 
    MembersModule, PlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
