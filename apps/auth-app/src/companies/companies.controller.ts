import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Company } from './entities/company.entity';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern('createCompany')
  create(@Payload() createCompanyDto: CreateCompanyDto): Observable<Company | Errors>  {
    return this.companiesService.create(createCompanyDto).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'La compañia no pudo ser creada', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findAllCompanies')
  findAll(): Observable<Company[] | Errors> {
    return this.companiesService.findAll().pipe(
      map((listarCompany) => listarCompany),
      catchError((error) => of({ msg: 'Error al listar las compañias', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneCompany')
  findOne(@Payload() id: number): Observable<Company | Errors> {
    return this.companiesService.findOne(id).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'Error al buscar la compañia', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateCompany')
  update(@Payload() updateCompanyDto: UpdateCompanyDto): Observable<Company | Errors>  {
    return this.companiesService.update(updateCompanyDto.id, updateCompanyDto).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'La compañia no se puedo modificar', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removeCompany')
  remove(@Payload() id: number): Observable<Company | Errors> {
    return this.companiesService.remove(id).pipe(
      map((company) => company),
      catchError((error) => of({ msg: 'Error al eliminar la compañia', error, status: HttpStatus.CONFLICT }))
    );
  }
}
