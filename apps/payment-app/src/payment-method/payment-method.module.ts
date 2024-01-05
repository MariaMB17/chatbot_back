import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { MysqlPrismaService } from '@PrismaServiceMysql';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, MysqlPrismaService],
})
export class PaymentMethodModule {}
