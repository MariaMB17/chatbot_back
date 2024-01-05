import { Module } from '@nestjs/common';
import { PaymentAppController } from './payment-app.controller';
import { PaymentAppService } from './payment-app.service';
import { PlanModule } from './plan/plan.module';
import { MembersModule } from './members/members.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AssociatedCurrenciesModule } from './associated-currencies/associated-currencies.module';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { PaymentMethodsOnInvoicesModule } from './payment-methods-on-invoices/payment-methods-on-invoices.module';

@Module({
  imports: [PlanModule, MembersModule, PaymentMethodModule, CurrenciesModule, InvoicesModule, AssociatedCurrenciesModule, ExchangerateModule, PaymentMethodsOnInvoicesModule],
  controllers: [PaymentAppController],
  providers: [PaymentAppService],
})
export class PaymentAppModule {}
