import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExchangerateService } from './exchangerate.service';
import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
import { Exchangerate } from './entities/exchangerate.entity';
import { Observable, catchError, map, of } from 'rxjs';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class ExchangerateController {
  constructor(private readonly exchangerateService: ExchangerateService) {}

  @MessagePattern('createExchangerate')
  create(@Payload() createExchangerateDto: CreateExchangerateDto): Observable<Exchangerate | Errors> {
    return this.exchangerateService.create(createExchangerateDto).pipe(
      map((exchangerate) => exchangerate),
      catchError((error) => of({ msg: 'Error al crear la tasa de cambio', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllExchangerate')
  findAll(): Observable<Exchangerate[] | Errors> {
    return this.exchangerateService.findAll().pipe(
      map((listExchangerate) => listExchangerate),
      catchError((error) => of({ msg: 'Error al listar las tasa de cambio', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneExchangerate')
  findOne(@Payload() id: number): Observable<Exchangerate | Errors> {
    return this.exchangerateService.findOne(id).pipe(
      map((exchangerate) => exchangerate),
      catchError((error) => of({ msg: 'Error al encontrar la tasa de cambio', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateExchangerate')
  update(@Payload() updateExchangerateDto: UpdateExchangerateDto): Observable<Exchangerate | Errors> {
    return this.exchangerateService.update(updateExchangerateDto.id, updateExchangerateDto).pipe(
      map((exchangerate) => exchangerate),
      catchError((error) => of({ msg: 'Error al modificar la tasa de cambio', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeExchangerate')
  remove(@Payload() id: number): Observable<Exchangerate | Errors> {
    return this.exchangerateService.remove(id).pipe(
      map((exchangerate) => exchangerate),
      catchError((error) => of({ msg: 'Error al eliminar la tasa de cambio', error, status: HttpStatus.CONFLICT }))
    );
  }
}
