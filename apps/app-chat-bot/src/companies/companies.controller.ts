import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }


  @UseGuards(AuthGuard)
  @Post()
  @ResponseMessage("Compañia guardada con exito!")
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ResponseMessage("Listado de compañias")
  findAll() {
    return this.companiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ResponseMessage("Compañia guardada con exito!")
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ResponseMessage("Compañia guardada con exito!")
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ResponseMessage("Compañia guardada con exito!")
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
