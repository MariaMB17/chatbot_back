import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Invoice } from '@prisma/client';
import { Observable, from } from 'rxjs';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
    return from(this.prismaService.invoice.create({
      data: createInvoiceDto.invoice
    }));
  }

  findAll(): Observable<Invoice[]> {
    return from(this.prismaService.invoice.findMany({
      include: {
        plan: {},
        currency: {},
        PaymentMethodOnInvoice: {}
      }
    }));
  }

  findOne(id: number): Observable<Invoice> {
    return from(this.prismaService.invoice.findFirst({
      where: { id },
      include: {
        plan: {},
        currency: {},
        PaymentMethodOnInvoice: {}
      }
    }));
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto): Observable<Invoice> {
    return from(this.prismaService.invoice.update({
      where: { id },
      data: updateInvoiceDto.invoice
    }));
  }

  remove(id: number): Observable<Invoice> {
    return from(this.prismaService.invoice.delete({
      where: { id }
    }));
  }
}
