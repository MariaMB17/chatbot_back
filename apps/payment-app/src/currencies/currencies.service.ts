import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Observable, from } from 'rxjs';
import { Currency } from './entities/currency.entity';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private readonly prismaService: PrismaService){}
  create(createCurrencyDto: CreateCurrencyDto): Observable<Currency> {
    return from(this.prismaService.currency.create({data: createCurrencyDto.currency}));
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
    return from(this.prismaService.currency.delete({ where: { id }}));
  }
}
