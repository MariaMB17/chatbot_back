import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssociatedCurrenciesModule } from './associated-currencies/associated-currencies.module';
import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bots/bots.module';
import { CompaniesModule } from './companies/companies.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { DatabaseModule } from './database/database.module';
import { MysqlPrismaService } from './database/mysql-prisma.service';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { InvoicesModule } from './invoices/invoices.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { MembersModule } from './members/members.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentMethodsOnInvoicesModule } from './payment-methods-on-invoices/payment-methods-on-invoices.module';
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
    BotsModule,
    PaymentMethodModule,
    CurrenciesModule,
    InvoicesModule,
    AssociatedCurrenciesModule,
    ExchangerateModule,
    PaymentMethodsOnInvoicesModule,
    KnowledgeModule
  ],
  controllers: [AppController],
  providers: [AppService, MysqlPrismaService],
})
export class AppModule { }
