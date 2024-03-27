import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../message.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    @Inject('user-service') private userMsService: ClientProxy) { }

  @Post()
  @ResponseMessage('Usuario creado con exito')
  create(@Body() createUserDto: CreateUserDto): Observable<any> {
    return this.usersService.create(createUserDto)
    //return this.userMsService.send('create-user', createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ResponseMessage("Usuarios listados exitosamente")
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ResponseMessage("Usuarios encontrado con exito")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ResponseMessage("Usuario moificado con exito")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //@UseGuards(AuthGuard)
  @Get('unique/:email')
  @ResponseMessage("Usuarios encontrado con exito")
  findOneUnique(@Param('email') email: string) {
    return this.usersService.findOneUnique(email);
  }
}

