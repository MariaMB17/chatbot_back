import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { CompaniesModule } from './companies/companies.module';
import { PlanModule } from './plan/plan.module';
import { MembersModule } from './members/members.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AssociatedCurrenciesModule } from './associated-currencies/associated-currencies.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    ProfileModule, 
    CompaniesModule, PlanModule, MembersModule, PaymentMethodModule, CurrenciesModule, InvoicesModule, AssociatedCurrenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
