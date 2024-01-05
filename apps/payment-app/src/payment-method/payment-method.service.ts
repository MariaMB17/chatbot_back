import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createPaymentMethodDto: CreatePaymentMethodDto): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.create({
      data: createPaymentMethodDto.paymentMethod
    }));
  }

  findAll(): Observable<PaymentMethod[]> {
    return from(this.prismaService.paymentMethod.findMany({
      include: {
        invoice: {}
      }
    }))
  }

  findOne(id: number): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.findFirst({
      where: { id },
      include: {
        invoice: {}
      }
    }))
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.update({
      where: { id },
      data: updatePaymentMethodDto.paymentMethod
    }))
  }

  remove(id: number): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.delete({ where: { id } }));
  }
}
