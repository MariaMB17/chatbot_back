import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';
import { PaymentMethod } from './entities/payment-method.entity';
import { Observable, from } from 'rxjs';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prismaService: PrismaService) {}
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
      where: {id},
      include: {
       invoice: {}
      }
    }))
  }

  update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.update({
      where: {id},
      data: updatePaymentMethodDto.paymentMethod
    }))
  }

  remove(id: number): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethod.delete({ where: { id }}));
  }
}
