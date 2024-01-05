import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Module } from '@nestjs/common';
import { PaymentMethodController } from './payment-method.controller';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, MysqlPrismaService],
})
export class PaymentMethodModule { }
