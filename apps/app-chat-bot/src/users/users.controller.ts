import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Query} from '@nestjs/common';
import { User } from '@prisma/mysql/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessage } from '../message.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';

@Controller('users')
export class UsersController {
  constructor(@Inject('msUser-service') private userMsService: ClientProxy) {}
  @Post()
  @ResponseMessage('Usuario creado con exito')
  create(@Body() createUserDto: CreateUserDto): Observable<any> {
    return this.userMsService.send('createUser', createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ResponseMessage("Usuarios listados exitosamente")
  findAll(): Observable<User[]>  {
    return this.userMsService.send('findAllUsers', '')
  }

  @Get('/email/:email')
  @ResponseMessage("Usuarios encontrado con exito")
  findEmail(@Param('email') email: string) {
    return this.userMsService.send('findOneUserEmail',email);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ResponseMessage("Usuarios encontrado con exito")
  findOne(@Param('id') id: string) {
    console.log(typeof id)
    return this.userMsService.send('findOneUser', +id);    
  }

  @UseGuards(AuthGuard)
  @ResponseMessage("Usuario moificado con exito") 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMsService.send('removeUser', +id);
  }
}
