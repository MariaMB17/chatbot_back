import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { CreateCompanyDto, DataCompany } from './dto/create-company.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Company } from 'apps/auth-app/src/companies/entities/company.entity';
import { Observable } from 'rxjs';

@Controller('companies')
export class CompaniesController {
  constructor(@Inject('company-service') private companyMsService: ClientProxy) { }


  @UseGuards(AuthGuard)
  @Post()
  @ResponseMessage("Compañia guardada con exito!")
  create(@Body() createCompanyDto: CreateCompanyDto): Observable<Company> {
    const dataCompany = this._dataCompany(createCompanyDto)
    return this.companyMsService.send('createCompany', dataCompany);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ResponseMessage("Listado de compañias")
  findAll(): Observable<Company[]> {
    return this.companyMsService.send('findAllCompanies', '');
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ResponseMessage("Compañia encontrada con exito!")
  findOne(@Param('id') id: string): Observable<Company> {
    return this.companyMsService.send('findOneCompany', +id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id') 
  @ResponseMessage("Compañia modificada con exito!")
  update(@Param('id') id: string, @Body() updateCompanyDto: CreateCompanyDto): Observable<Company> {
    const dataCompany = {
      id:+id,
      ...this._dataCompany(updateCompanyDto)
    }
    return this.companyMsService.send('updateCompany', dataCompany);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ResponseMessage("Compañia eliminada con exito!")
  remove(@Param('id') id: string) {
    return this.companyMsService.send('removeCompany', +id);
  }

  private _dataCompany(data: CreateCompanyDto){    
    let dataCompany = new DataCompany()    
    dataCompany.company = data
    return dataCompany
  }
}
