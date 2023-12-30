import { Body, Controller, Inject, Post, Session } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map, tap } from 'rxjs';
import { ResponseMessage } from '../message.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('auth-service') private authMsService: ClientProxy) { }


  @Post('signin')
  @ResponseMessage('Inicio de sesión exitoso')
  login(@Session() sessions: Record<string, any>, @Body() createAuthDto: CreateAuthDto): Observable<any> {
    return this.authMsService.send('evt-login', createAuthDto).pipe(
      tap((user) => { sessions.userId = user.id }),
      map((userResponse) => userResponse)
    );
  }
}
