import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateInvoiceDto, DataInvoice } from './dto/create-invoice.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Invoice } from './entities/invoice.entity';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';

@Controller('invoices')
export class InvoicesController {
  constructor(@Inject('invoice-service') private readonly invoicesMsServices: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('La factura fue creada con exito')
  create(@Body() createInvoiceDto: CreateInvoiceDto): Observable<Invoice> {    
    const dataInvoice = this._dataInvoice(createInvoiceDto)
    return this.invoicesMsServices.send('createInvoice', dataInvoice);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de facturas')
  findAll(): Observable<Invoice[]> {
    return this.invoicesMsServices.send('findAllInvoices', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La factura fue encontrada con exito')
  findOne(@Param('id') id: string): Observable<Invoice> {
    return this.invoicesMsServices.send('findOneInvoice', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La factura fue modificada con exito')
  update(@Param('id') id: string, @Body() updateInvoiceDto: CreateInvoiceDto): Observable<Invoice> {
    const dataInvoice = {
      id:+id,
      ...this._dataInvoice(updateInvoiceDto)
    }
    return this.invoicesMsServices.send('updateInvoice', dataInvoice);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La factura fue eliminada con exito')
  remove(@Param('id') id: string): Observable<Invoice> {
    return this.invoicesMsServices.send('removeInvoice', +id);
  }

  private _dataInvoice(data: CreateInvoiceDto){    
    let dataInvoice = new DataInvoice()    
    dataInvoice.invoice = data
    return dataInvoice
  }
}
