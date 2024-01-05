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
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AssociatedCurrenciesModule } from './associated-currencies/associated-currencies.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { PaymentMethodsOnInvoicesModule } from './payment-methods-on-invoices/payment-methods-on-invoices.module';
process.env.NODE_ENV = process.env.NODE_ENV || 'env';
console.log(process.env.NODE_ENV)
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
    PaymentMethodsOnInvoicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
