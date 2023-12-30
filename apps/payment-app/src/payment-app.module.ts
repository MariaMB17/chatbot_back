import { Module } from '@nestjs/common';
import { PaymentAppController } from './payment-app.controller';
import { PaymentAppService } from './payment-app.service';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [PaymentAppController],
  providers: [PaymentAppService],
})
export class PaymentAppModule {}
