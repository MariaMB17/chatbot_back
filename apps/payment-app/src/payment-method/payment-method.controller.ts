import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { PaymentMethod } from './entities/payment-method.entity';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @MessagePattern('createPaymentMethod')
  create(@Payload() createPaymentMethodDto: CreatePaymentMethodDto): Observable<PaymentMethod | Errors> {
    return this.paymentMethodService.create(createPaymentMethodDto).pipe(
      map((paymentMethod) => paymentMethod),
      catchError((error) => of({ msg: 'Error al crear al metodo de pago', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllPaymentMethod')
  findAll(): Observable<PaymentMethod[] | Errors> {
    return this.paymentMethodService.findAll().pipe(
      map((listPaymentMethod) => listPaymentMethod),
      catchError((error) => of({ msg: 'Error al mostrar la lista de metodo de pago', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOnePaymentMethod')
  findOne(@Payload() id: number): Observable<PaymentMethod | Errors> {
    return this.paymentMethodService.findOne(id).pipe(
      map((paymentMethod) => paymentMethod),
      catchError((error) => of({ msg: 'Error al mostrar el metodo de pago', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updatePaymentMethod')
  update(@Payload() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(updatePaymentMethodDto.id, updatePaymentMethodDto).pipe(
      map((paymentMethod) => paymentMethod),
      catchError((error) => of({ msg: 'Error al modificar el metodo de pago', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removePaymentMethod')
  remove(@Payload() id: number) {
    return this.paymentMethodService.remove(id).pipe(
      map((paymentMethod) => paymentMethod),
      catchError((error) => of({ msg: 'Error al eliminar el metodo de pago', error, status: HttpStatus.CONFLICT }))
    );
  }
}
