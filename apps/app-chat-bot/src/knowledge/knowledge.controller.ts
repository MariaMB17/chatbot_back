import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from '../message.decorator';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) { }

  @ResponseMessage('Filtrado por Paginas')
  @Get('filtered/:query/:currentPage')
  findFilteredPages(
    @Param('query') query: string,
    @Param('currentPage', ParseIntPipe) currentPage: number) {
    return this.knowledgeService.findFilteredPages(query, currentPage)
  }

  @ResponseMessage('Cantidad de Registros Encontrados')
  @Get('records/:query')
  findCountRecords(@Param('query') query: string) {
    return this.knowledgeService.findCountRecords(query)
  }

  @Post()
  @ResponseMessage('Registro Creado')
  create(
    @Body() createKnowledgeDto: CreateKnowledgeDto) {
    return this.knowledgeService.create(createKnowledgeDto);
  }

  @Get('textContext/:id')
  @ResponseMessage('Envio de textContent')
  textContent(@Param('id', ParseIntPipe) id: number) {
    return this.knowledgeService.textContent(id);
  }

  @Get()
  @ResponseMessage('Consulta General')
  findAll() {
    return this.knowledgeService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Registro Especifico')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.knowledgeService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Registro Actualizado')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKnowledgeDto: UpdateKnowledgeDto,
  ) {
    return this.knowledgeService.update(id, updateKnowledgeDto);
  }

  @Delete(':id')
  @ResponseMessage('Registro Eliminado')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.knowledgeService.remove(id);
  }

  @Delete('base/:id')
  @ResponseMessage('Documento Eliminado')
  removeBase(@Param('id', ParseIntPipe) id: number) {
    return this.knowledgeService.removeBase(id);
  }

  @Post('upload')
  @ResponseMessage('Archivo Subido')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @Body('member_id', ParseIntPipe) member_id: number,
    @Body('knowledge_id', ParseIntPipe) knowledge_id: number,
    @UploadedFiles() files: Express.Multer.File[],) {
    return this.knowledgeService.upload(member_id, knowledge_id, files);
  }
}