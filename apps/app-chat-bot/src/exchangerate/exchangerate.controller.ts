import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateExchangerateDto, DataExchangerate } from './dto/create-exchangerate.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Exchangerate } from '@Appchatbot/exchangerate/entities/exchangerate.entity';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '@Appchatbot/message.decorator';

@Controller('exchangerate')
export class ExchangerateController {
  constructor(@Inject('exchangerate-service') private exchangerateMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('La tasa de cambio fue creado con exito')
  create(@Body() createExchangerateDto: CreateExchangerateDto): Observable<Exchangerate> {
    const data = this._dataExchangerate(createExchangerateDto)
    return this.exchangerateMsService.send('createExchangerate', data);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de tasas de cambio')
  findAll(): Observable<Exchangerate[]> {
    return this.exchangerateMsService.send('findAllExchangerate', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La tasa de cambio fue encontrada')
  findOne(@Param('id') id: string): Observable<Exchangerate> {
    return this.exchangerateMsService.send('findOneExchangerate', +id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La tasa de cambio fue modificada con exito')
  update(@Param('id') id: string, @Body() updateExchangerateDto: CreateExchangerateDto): Observable<Exchangerate> {
    const data = {
      id:+id,
      ...this._dataExchangerate(updateExchangerateDto)
    }
    return this.exchangerateMsService.send('updateExchangerate', data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('La tasa de cambio eliminada con exito')
  remove(@Param('id') id: string): Observable<Exchangerate> {
    return this.exchangerateMsService.send('removeExchangerate', +id);
  }

  private _dataExchangerate(data: CreateExchangerateDto){    
    let dataExchangerate = new DataExchangerate()    
    dataExchangerate.exchangerate = data
    return dataExchangerate
  }
}
