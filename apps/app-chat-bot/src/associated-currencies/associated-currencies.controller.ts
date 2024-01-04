import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateAssociatedCurrencyDto, DataAssociatedCurrency } from './dto/create-associated-currency.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { AssociatedCurrency } from './entities/associated-currency.entity';
import { Observable } from 'rxjs';

@Controller('associated-currencies')
export class AssociatedCurrenciesController {
  constructor(@Inject('associated-currency-service') private associatedCurrencyMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('La moneda fue asociada con exito')
  create(@Body() createAssociatedCurrencyDto: CreateAssociatedCurrencyDto): Observable<AssociatedCurrency>  {
    const dataAssociatedCurrencyDto = this._dataAssociatedCurrencies(createAssociatedCurrencyDto)
    return this.associatedCurrencyMsService.send('createAssociatedCurrency', dataAssociatedCurrencyDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Lista de monedas asociadas')
  findAll(): Observable<AssociatedCurrency[]> {
    return this.associatedCurrencyMsService.send('findAllAssociatedCurrencies','');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Monedas asociadas')
  findOne(@Param('id') id: string): Observable<AssociatedCurrency> {
    return this.associatedCurrencyMsService.send('findOneAssociatedCurrency', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Moneda asociada modificada con exito')
  update(@Param('id') id: string, @Body() updateAssociatedCurrencyDto: CreateAssociatedCurrencyDto): Observable<AssociatedCurrency> {
    const dataAssociatedCurrency = {
      id:+id,
      ...this._dataAssociatedCurrencies(updateAssociatedCurrencyDto)
    }
    return this.associatedCurrencyMsService.send('updateAssociatedCurrency', dataAssociatedCurrency);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Moneda asociada eliminada con exito')
  remove(@Param('id') id: string): Observable<AssociatedCurrency> {
    return this.associatedCurrencyMsService.send('removeAssociatedCurrency', +id);
  }

  private _dataAssociatedCurrencies(data: CreateAssociatedCurrencyDto){    
    let dataAssociatedCurrency = new DataAssociatedCurrency()    
    dataAssociatedCurrency.associatedCurrency = data
    return dataAssociatedCurrency
  }
}
