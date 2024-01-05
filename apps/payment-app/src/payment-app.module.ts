import { Module } from '@nestjs/common';
import { AssociatedCurrenciesModule } from './associated-currencies/associated-currencies.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { InvoicesModule } from './invoices/invoices.module';
import { MembersModule } from './members/members.module';
import { PaymentAppController } from './payment-app.controller';
import { PaymentAppService } from './payment-app.service';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { PaymentMethodsOnInvoicesModule } from './payment-methods-on-invoices/payment-methods-on-invoices.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    PlanModule,
    MembersModule,
    PaymentMethodModule,
    CurrenciesModule,
    InvoicesModule,
    AssociatedCurrenciesModule,
    ExchangerateModule,
    PaymentMethodsOnInvoicesModule],
  controllers: [PaymentAppController],
  providers: [PaymentAppService],
})
export class PaymentAppModule { }
