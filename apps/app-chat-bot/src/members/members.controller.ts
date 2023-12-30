import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';

@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService) {}

 
  @UseGuards(AuthGuard)
  @Post()
  @ResponseMessage("Miembro guardado con exito!")
  create(@Body() createMemberDto: CreateMemberDto[]) {
    return this.membersService.create(createMemberDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ResponseMessage("Listado de miembros!")
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage("Informacion del miembro!")
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage("Se modifico el miembro con exito!")
  update(@Param('id') id: string, @Body() updateMemberDto: any/*UpdateMemberDto*/) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
