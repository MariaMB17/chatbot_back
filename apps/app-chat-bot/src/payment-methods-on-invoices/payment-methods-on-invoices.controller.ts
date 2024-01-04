import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreatePaymentMethodsOnInvoiceDto, DataPaymentMethodsOnInvoice } from './dto/create-payment-methods-on-invoice.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '@Appchatbot/message.decorator';

@Controller('payment-methods-on-invoices')
export class PaymentMethodsOnInvoicesController {
  constructor(@Inject('paymentMethodsOnInvoices-service') private paymentMethodsOnInvoicesMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('El pago de la factura fue procesado con exito')
  create(@Body() createPaymentMethodsOnInvoiceDto: CreatePaymentMethodsOnInvoiceDto) {
    const data = this._dataPaymentMethodsOnInvoices(createPaymentMethodsOnInvoiceDto)
    return this.paymentMethodsOnInvoicesMsService.send('createPaymentMethodsOnInvoice', data);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de pago de factura')
  findAll() {
    return this.paymentMethodsOnInvoicesMsService.send('findAllPaymentMethodsOnInvoices', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El pago de la factura encontrado')
  findOne(@Param('id') id: string) {
    return this.paymentMethodsOnInvoicesMsService.send('findOnePaymentMethodsOnInvoice', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El pago de la factura fue modificado con exito')
  update(@Param('id') id: string, @Body() updatePaymentMethodsOnInvoiceDto: CreatePaymentMethodsOnInvoiceDto) {
    const data = {
      id:+id,
      ...this._dataPaymentMethodsOnInvoices(updatePaymentMethodsOnInvoiceDto)
    }
    return this.paymentMethodsOnInvoicesMsService.send('updatePaymentMethodsOnInvoice', data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El pago de la factura fue eliminado con exito')
  remove(@Param('id') id: string) {
    return this.paymentMethodsOnInvoicesMsService.send('removePaymentMethodsOnInvoice', +id);
  }

  private _dataPaymentMethodsOnInvoices(data: CreatePaymentMethodsOnInvoiceDto){    
    let dataPaymentMethodsOnInvoice = new DataPaymentMethodsOnInvoice()    
    dataPaymentMethodsOnInvoice.paymentMethodsOnInvoice = data
    return dataPaymentMethodsOnInvoice
  }
}
