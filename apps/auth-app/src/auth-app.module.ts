import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { CompaniesModule } from './companies/companies.module';
import { ProfilesModule } from './profiles/profiles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '5000s' },
    }),
    CompaniesModule,
    ProfilesModule,
    UsersModule,
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService, MysqlPrismaService],
})
export class AuthAppModule { }
