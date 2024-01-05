import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AssociatedCurrenciesService } from './associated-currencies.service';
import { CreateAssociatedCurrencyDto } from './dto/create-associated-currency.dto';
import { UpdateAssociatedCurrencyDto } from './dto/update-associated-currency.dto';
import { AssociatedCurrency } from './entities/associated-currency.entity';
import { Errors } from 'core/interface/interface-error';
import { Observable, catchError, map, of } from 'rxjs';

@Controller()
export class AssociatedCurrenciesController {
  constructor(private readonly associatedCurrenciesService: AssociatedCurrenciesService) {}

  @MessagePattern('createAssociatedCurrency')
  create(@Payload() createAssociatedCurrencyDto: CreateAssociatedCurrencyDto): Observable<AssociatedCurrency | Errors> {
    return this.associatedCurrenciesService.create(createAssociatedCurrencyDto).pipe(
      map((associatedCurrency) => associatedCurrency),
      catchError((error) => of({ msg: 'Error al crear la moneda asociada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllAssociatedCurrencies')
  findAll(): Observable<AssociatedCurrency[] | Errors> {
    return this.associatedCurrenciesService.findAll().pipe(
      map((listAssociatedCurrency) => listAssociatedCurrency),
      catchError((error) => of({ msg: 'Error al listar las monedas asociadas', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneAssociatedCurrency')
  findOne(@Payload() id: number): Observable<AssociatedCurrency | Errors> {
    return this.associatedCurrenciesService.findOne(id).pipe(
      map((associatedCurrency) => associatedCurrency),
      catchError((error) => of({ msg: 'Error al buscar la moneda asociada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateAssociatedCurrency')
  update(@Payload() updateAssociatedCurrencyDto: UpdateAssociatedCurrencyDto): Observable<AssociatedCurrency | Errors> {
    return this.associatedCurrenciesService.update(updateAssociatedCurrencyDto.id, updateAssociatedCurrencyDto).pipe(
      map((associatedCurrency) => associatedCurrency),
      catchError((error) => of({ msg: 'Error al modificar la asociada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeAssociatedCurrency')
  remove(@Payload() id: number): Observable<AssociatedCurrency | Errors> {
    return this.associatedCurrenciesService.remove(id).pipe(
      map((associatedCurrency) => associatedCurrency),
      catchError((error) => of({ msg: 'Error al eliminar la moneda asociada', error, status: HttpStatus.CONFLICT }))
    );
  }
}
