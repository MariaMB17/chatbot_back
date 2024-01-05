import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createCurrencyDto: CreateCurrencyDto): Observable<Currency> {
    return from(this.prismaService.currency.create({ data: createCurrencyDto.currency }));
  }

  findAll(): Observable<Currency[]> {
    return from(this.prismaService.currency.findMany({
      include: {
        invoice: {},
        associatedCurrency: {},
        exchangeRate: {}
      }
    }))
  }

  findOne(id: number): Observable<Currency> {
    return from(this.prismaService.currency.findFirst({
      where: { id },
      include: {
        invoice: {},
        associatedCurrency: {},
        exchangeRate: {}
      }
    }));
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto): Observable<Currency> {
    return from(this.prismaService.currency.update({
      where: { id },
      data: updateCurrencyDto.currency,
    }));
  }

  remove(id: number): Observable<Currency> {
    return from(this.prismaService.currency.delete({ where: { id } }));
  }
}
