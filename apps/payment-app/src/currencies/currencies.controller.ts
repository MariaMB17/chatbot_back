import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Currency } from './entities/currency.entity';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @EventPattern('createCurrency')
  create(@Payload() createCurrencyDto: CreateCurrencyDto): Observable<Currency | Errors> {
    return this.currenciesService.create(createCurrencyDto).pipe(
      map((currency) => currency),
      catchError((error) => of({ msg: 'La moneda no pudo ser creada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllCurrencies')
  findAll(): Observable<Currency[] | Errors> {
    return this.currenciesService.findAll().pipe(
      map((listCurrency) => listCurrency),
      catchError((error) => of({ msg: 'Error al mostrar la lista de monedas', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneCurrency')
  findOne(@Payload() id: number): Observable<Currency> {
    return this.currenciesService.findOne(id).pipe(
      map((currency) => currency),
      catchError((error) => of({ msg: 'Error al buscar la moneda', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateCurrency')
  update(@Payload() updateCurrencyDto: UpdateCurrencyDto): Observable<Currency> {
    return this.currenciesService.update(updateCurrencyDto.id, updateCurrencyDto).pipe(
      map((currency) => currency),
      catchError((error) => of({ msg: 'Error al modificar la monedas', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeCurrency')
  remove(@Payload() id: number): Observable<Currency> {
    return this.currenciesService.remove(id).pipe(
      map((currency) => currency),
      catchError((error) => of({ msg: 'Error al eliminar la monedas', error, status: HttpStatus.CONFLICT }))
    );
  }
}
