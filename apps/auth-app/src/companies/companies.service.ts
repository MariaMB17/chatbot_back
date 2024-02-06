import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Observable, from } from 'rxjs';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  create(createCompanyDto: CreateCompanyDto): Observable<Company> {
    return from(this.prismaService.company.create({
      data: createCompanyDto.company
    }));
  }

  findAll(): Observable<Company[]> {
    return from(this.prismaService.company.findMany({
      include: {
        member: {
          include: {
            user: {}
          }
        },
      },
    }))
  }

  findOne(id: number):Observable<Company> {
    return from(this.prismaService.company.findFirst({
      where: {
        id,
      },
      include: {
        member: {
          include: {
            user: {}
          }
        },
      },
    }));
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto):Observable<Company>  {
    return from(this.prismaService.company.update({
      where: { id },
      data: updateCompanyDto.company,
    }));
  }

  remove(id: number):Observable<Company> {
    return from(this.prismaService.company.delete({ where: { id } }));
  }
}
