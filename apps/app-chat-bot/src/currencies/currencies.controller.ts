import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateCurrencyDto, DataCurrency } from './dto/create-currency.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Currency } from './entities/currency.entity';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';

@Controller('currencies')
export class CurrenciesController {
  constructor(@Inject('currencies-service') private currenciesMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Moneda creada con exito')
  create(@Body() createCurrencyDto: CreateCurrencyDto): Observable<Currency> {
    const dataCurrency = this._dataCurrency(createCurrencyDto)
    return this.currenciesMsService.send('createCurrency', dataCurrency);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de monedas')
  findAll(): Observable<Currency[]> {
    return this.currenciesMsService.send('findAllCurrencies', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Se encontro la moneda con exito')
  findOne(@Param('id') id: string): Observable<Currency> {
    return this.currenciesMsService.send('findOneCurrency', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Se modifica la moneda con exito')
  update(@Param('id') id: string, @Body() updateCurrencyDto: CreateCurrencyDto): Observable<Currency> {
    const dataCurrency = {
      id:+id,
      ...this._dataCurrency(updateCurrencyDto)
    }
    return this.currenciesMsService.send('updateCurrency', dataCurrency);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La moneda fue eliminada con exito')
  remove(@Param('id') id: string): Observable<Currency> {
    return this.currenciesMsService.send('removeCurrency', +id);
  }

  private _dataCurrency(data: CreateCurrencyDto){    
    let dataCurrency = new DataCurrency()    
    dataCurrency.currency = data
    return dataCurrency
  }
}
