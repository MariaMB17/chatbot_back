import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseMessage } from '../message.decorator';
import { Observable, map, of, tap } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('auth-service') private authMsService: ClientProxy) { }


  @Post('signin')
  @ResponseMessage('Inicio de sesión exitoso')
  login(@Session() sessions: Record<string, any>, @Body() createAuthDto: CreateAuthDto):Observable<any> {
    return this.authMsService.send('evt-login', createAuthDto).pipe(
      tap((user) => { sessions.userId = user.id } ),
      map((userResponse) => userResponse )
    );
  }
}
