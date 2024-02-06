import { Controller, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/mysql/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll(): Observable<User[] | Errors>  {
    return this.usersService.findAll().pipe(
      map((listarUser) => listarUser),
      catchError((error) => of({ msg: 'Error al listar los usuarios', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneUserEmail')
  findUserByEmail(@Payload() email: string) {
    return this.usersService.findUserByEmail(email).pipe(
      map((user) => user),
      catchError((error) => of({ msg: 'Error al buscar al usuario', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id).pipe(
      map((user) => user),
      catchError((error) => of({ msg: 'Error al buscar al usuario', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id).pipe(
      map((user) => user),
      catchError((error) => of({ msg: 'Error al eliminar al usuario', error, status: HttpStatus.CONFLICT }))
    );
  }
}
