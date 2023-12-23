import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../message.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, 
    @Inject('user-service') private userMsService: ClientProxy) {}

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
}
