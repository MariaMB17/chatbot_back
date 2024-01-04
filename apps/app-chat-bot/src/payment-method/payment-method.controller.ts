import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreatePaymentMethodDto, DataPaymentMethod } from './dto/create-payment-method.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { Observable } from 'rxjs';
import { PaymentMethod } from './entities/payment-method.entity';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(@Inject('payment-method-service') private paymetMethodMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('El metodo de pago fue creado con exito')
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto): Observable<PaymentMethod>  {
    const dataPayment = this._dataPaymetMethod(createPaymentMethodDto)
    return this.paymetMethodMsService.send('createPaymentMethod', dataPayment);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de metodos de pago')
  findAll(): Observable<PaymentMethod[]> {
    return this.paymetMethodMsService.send('findAllPaymentMethod', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El metodo de pago fue creado con exito')
  findOne(@Param('id') id: string): Observable<PaymentMethod> {
    return this.paymetMethodMsService.send('findOnePaymentMethod', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El metodo de pago fue modificado con exito')
  update(@Param('id') id: string, @Body() updatePaymentMethodDto: CreatePaymentMethodDto): Observable<PaymentMethod> {
    const dataPayment = {
      id:+id,
      ...this._dataPaymetMethod(updatePaymentMethodDto)
    }
    return this.paymetMethodMsService.send('updatePaymentMethod', dataPayment);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('El metodo de pago fue eliminado con exito')
  remove(@Param('id') id: string): Observable<PaymentMethod> {
    return this.paymetMethodMsService.send( 'removePaymentMethod', +id);
  }

  private _dataPaymetMethod(data: CreatePaymentMethodDto){    
    let dataPaymentMethod = new DataPaymentMethod()    
    dataPaymentMethod.paymentMethod = data
    return dataPaymentMethod
  }
}
