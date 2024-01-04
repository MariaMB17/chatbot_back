import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';
import { CreatePaymentMethodsOnInvoiceDto } from './dto/create-payment-methods-on-invoice.dto';
import { UpdatePaymentMethodsOnInvoiceDto } from './dto/update-payment-methods-on-invoice.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Errors } from 'core/interface/interface-error';
import { PaymentMethodsOnInvoice } from './entities/payment-methods-on-invoice.entity';

@Controller()
export class PaymentMethodsOnInvoicesController {
  constructor(private readonly paymentMethodsOnInvoicesService: PaymentMethodsOnInvoicesService) {}

  @MessagePattern('createPaymentMethodsOnInvoice')
  create(@Payload() createPaymentMethodsOnInvoiceDto: CreatePaymentMethodsOnInvoiceDto): Observable<PaymentMethodsOnInvoice | Errors> {
    return this.paymentMethodsOnInvoicesService.create(createPaymentMethodsOnInvoiceDto).pipe(
      map((paymentMethodsOnInvoices) => paymentMethodsOnInvoices),
      catchError((error) => of({ msg: 'Error al crear mentodo de pago de la factura', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllPaymentMethodsOnInvoices')
  findAll(): Observable<PaymentMethodsOnInvoice[] | Errors> {
    return this.paymentMethodsOnInvoicesService.findAll().pipe(
      map((paymentMethodsOnInvoices) => paymentMethodsOnInvoices),
      catchError((error) => of({ msg: 'Error al listar los metodos de pago de la factura', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOnePaymentMethodsOnInvoice')
  findOne(@Payload() id: number): Observable<PaymentMethodsOnInvoice | Errors> {
    return this.paymentMethodsOnInvoicesService.findOne(id).pipe(
      map((paymentMethodsOnInvoices) => paymentMethodsOnInvoices),
      catchError((error) => of({ msg: 'Error al buscar el metodo de pago de la factura', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updatePaymentMethodsOnInvoice')
  update(@Payload() updatePaymentMethodsOnInvoiceDto: UpdatePaymentMethodsOnInvoiceDto): Observable<PaymentMethodsOnInvoice | Errors> {
    return this.paymentMethodsOnInvoicesService.update(updatePaymentMethodsOnInvoiceDto.id, 
      updatePaymentMethodsOnInvoiceDto).pipe(
      map((paymentMethodsOnInvoices) => paymentMethodsOnInvoices),
      catchError((error) => of({ msg: 'Error al modificar el metodo de pago de la factura', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removePaymentMethodsOnInvoice')
  remove(@Payload() id: number): Observable<PaymentMethodsOnInvoice | Errors> {
    return this.paymentMethodsOnInvoicesService.remove(id).pipe(
      map((paymentMethodsOnInvoices) => paymentMethodsOnInvoices),
      catchError((error) => of({ msg: 'Error al eliminar el metodo de pago de la factura', error, status: HttpStatus.CONFLICT }))
    );
  }
}
