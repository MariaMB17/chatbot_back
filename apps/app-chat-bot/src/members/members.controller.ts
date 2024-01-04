import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { Observable, map } from 'rxjs';
import { Member } from './entities/member.entity';

@Controller('members')
export class MembersController {
  constructor(@Inject('member-service') private memberMsService: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Miembro creado con exito')
  create(@Body() createMemberDto: CreateMemberDto): Observable<Member> {
    return this.memberMsService.send('createMember', createMemberDto).pipe(
      map((dataMember: any) => {
        if(dataMember?.error) {
          console.log(dataMember.meta)
        }
        return dataMember        
      })
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de mienbros')  
  findAll(): Observable<Member[]> {
    return this.memberMsService.send('findAllMembers', '')
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Miembro encontrado con exito') 
  findOne(@Param('id') id: string): Observable<Member>  {
    return this.memberMsService.send('findOneMember', +id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ResponseMessage('Miembro modificado con exito') 
  update(@Body() updateMemberDto: UpdateMemberDto) {
    return this.memberMsService.send('updateMember', updateMemberDto.member);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Miembro eliminado con exito')
  remove(@Param('id') id: string) {
    return this.memberMsService.send('removeMember', +id);
  }
}
