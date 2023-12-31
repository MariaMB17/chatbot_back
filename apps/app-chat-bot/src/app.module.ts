import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bots/bots.module';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './members/members.module';
import { PlanModule } from './plan/plan.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
    CompaniesModule,
    MembersModule,
    PlanModule,
    DatabaseModule,
    BotsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
