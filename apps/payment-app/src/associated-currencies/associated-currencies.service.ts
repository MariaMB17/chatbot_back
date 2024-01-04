import { Injectable } from '@nestjs/common';
import { CreateAssociatedCurrencyDto } from './dto/create-associated-currency.dto';
import { UpdateAssociatedCurrencyDto } from './dto/update-associated-currency.dto';
import { PrismaService } from '@PrismaServiceMysql';
import { Observable, from } from 'rxjs';
import { AssociatedCurrency } from './entities/associated-currency.entity';

@Injectable()
export class AssociatedCurrenciesService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createAssociatedCurrencyDto: CreateAssociatedCurrencyDto): Observable<AssociatedCurrency>  {
    return from(this.prismaService.associatedCurrency.create({
      data: createAssociatedCurrencyDto.associatedCurrency
    }));
  }

  findAll(): Observable<AssociatedCurrency[]> {
    return from(this.prismaService.associatedCurrency.findMany({
      include: {
        exchangeRate: {}
      }
    }));
  }

  findOne(id: number): Observable<AssociatedCurrency> {
    return from(this.prismaService.associatedCurrency.findFirst({
      where: { id },
      include: {
        exchangeRate: {}
      }
    }));
  }

  update(id: number, updateAssociatedCurrencyDto: UpdateAssociatedCurrencyDto): Observable<AssociatedCurrency> {
    return from(this.prismaService.associatedCurrency.update({
      where: { id },
      data: updateAssociatedCurrencyDto.associatedCurrency
    }));
  }

  remove(id: number): Observable<AssociatedCurrency> {
    return from(this.prismaService.associatedCurrency.delete({ where: { id } }))
  }
}
