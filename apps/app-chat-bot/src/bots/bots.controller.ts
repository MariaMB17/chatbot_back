import { ResponseMessage } from '@Appchatbot/message.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) { }

  @Get('unique/:name')
  @ResponseMessage('Consulta Unica')
  findOneUnique(@Param('name') name: string) {
    return this.botsService.findOneUnique(name);
  }

  @ResponseMessage('Filtrado por Paginas')
  @Get('filtered/:query/:currentPage')
  findFilteredPages(
    @Param('query') query: string,
    @Param('currentPage', ParseIntPipe) currentPage: number) {
    return this.botsService.findFilteredPages(query, currentPage)
  }

  @ResponseMessage('Cantidad de Registros Encontrados')
  @Get('records/:query')
  findCountRecords(@Param('query') query: string) {
    return this.botsService.findCountRecords(query)
  }

  @Post()
  @ResponseMessage('Registro Creado')
  create(@Body() createBotDto: CreateBotDto) {
    return this.botsService.create(createBotDto);
  }

  @Get()
  @ResponseMessage('Consulta General')
  findAll() {
    return this.botsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Registro Especifico')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.botsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBotDto: UpdateBotDto) {
    return this.botsService.update(id, updateBotDto);
  }

  @Delete(':id')
  @ResponseMessage('Registro Eliminado')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.botsService.remove(id);
  }
}
