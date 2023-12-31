import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { PaymentMethod } from '../payment-method/entities/payment-method.entity';
import { CreatePaymentMethodsOnInvoiceDto } from './dto/create-payment-methods-on-invoice.dto';
import { UpdatePaymentMethodsOnInvoiceDto } from './dto/update-payment-methods-on-invoice.dto';

@Injectable()
export class PaymentMethodsOnInvoicesService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createPaymentMethodsOnInvoiceDto: CreatePaymentMethodsOnInvoiceDto): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethodOnInvoice.create({
      data: createPaymentMethodsOnInvoiceDto.paymentMethodsOnInvoice
    }));
  }

  findAll(): Observable<PaymentMethod[]> {
    return from(this.prismaService.paymentMethodOnInvoice.findMany());
  }

  findOne(id: number): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethodOnInvoice.findFirst({
      where: { id }
    }));
  }

  update(id: number, updatePaymentMethodsOnInvoiceDto: UpdatePaymentMethodsOnInvoiceDto): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethodOnInvoice.update({
      where: { id },
      data: updatePaymentMethodsOnInvoiceDto.paymentMethodsOnInvoice
    }));
  }

  remove(id: number): Observable<PaymentMethod> {
    return from(this.prismaService.paymentMethodOnInvoice.delete({ where: { id } }));
  }
}
