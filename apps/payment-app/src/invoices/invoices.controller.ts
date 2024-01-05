import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Errors } from 'core/interface/interface-error';
import { Observable, catchError, map, of } from 'rxjs';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @MessagePattern('createInvoice')
  create(@Payload() createInvoiceDto: CreateInvoiceDto): Observable<Invoice | Errors>  {
    return this.invoicesService.create(createInvoiceDto).pipe(
      map((invoice) => invoice),
      catchError((error) => of({ msg: 'La factura no pudo ser creada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllInvoices')
  findAll(): Observable<Invoice[] | Errors>  {
    return this.invoicesService.findAll().pipe(
      map((listInvoice) => listInvoice),
      catchError((error) => of({ msg: 'Error al listar las facturas', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneInvoice')
  findOne(@Payload() id: number): Observable<Invoice | Errors>  {
    return this.invoicesService.findOne(id).pipe(
      map((invoice) => invoice),
      catchError((error) => of({ msg: 'La factura no fue encontrada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateInvoice')
  update(@Payload() updateInvoiceDto: UpdateInvoiceDto): Observable<Invoice | Errors>  {
    return this.invoicesService.update(updateInvoiceDto.id, updateInvoiceDto).pipe(
      map((invoice) => invoice),
      catchError((error) => of({ msg: 'Error al modificar la factura', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeInvoice')
  remove(@Payload() id: number): Observable<Invoice | Errors>  {
    return this.invoicesService.remove(id).pipe(
      map((invoice) => invoice),
      catchError((error) => of({ msg: 'Error al eliminar la factura', error, status: HttpStatus.CONFLICT }))
    );
  }
}
