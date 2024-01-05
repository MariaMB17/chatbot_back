import { Injectable } from '@nestjs/common';
import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
import { MysqlPrismaService } from '@PrismaServiceMysql';
import { Observable, from } from 'rxjs';
import { Exchangerate } from './entities/exchangerate.entity';

@Injectable()
export class ExchangerateService {
  constructor(private readonly prismaService: MysqlPrismaService) {}
  create(createExchangerateDto: CreateExchangerateDto): Observable<Exchangerate> {
    return from(this.prismaService.exchangeRate.create({
      data: createExchangerateDto.exchangerate
    }));
  }

  findAll(): Observable<Exchangerate[]> {
    return  from(this.prismaService.exchangeRate.findMany());
  }

  findOne(id: number): Observable<Exchangerate> {
    return  from(this.prismaService.exchangeRate.findFirst({
      where: {id}
    }));
  }

  update(id: number, updateExchangerateDto: UpdateExchangerateDto): Observable<Exchangerate> {
    return  from(this.prismaService.exchangeRate.update({
      where: { id },
      data: updateExchangerateDto.exchangerate
    }));
  }

  remove(id: number): Observable<Exchangerate> {
    return  from(this.prismaService.exchangeRate.delete({ where: { id } }));
  }
}
