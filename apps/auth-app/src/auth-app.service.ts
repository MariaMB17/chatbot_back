import { HttpException, HttpStatus, Injectable, NotFoundException, Session } from '@nestjs/common';
import { PrismaService } from '@PrismaServiceMysql';
import { createAuthDto } from './dtos/login.dto';
import { Observable, catchError, from, map, of, switchMap, tap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user/dto/create-user.dto';
import { Prisma, User } from '@prisma/client';
import { Errors } from 'core/interface/interface-error';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World! desde mensaje';
  }

  async getGoodbye(message: string): Promise<void> {
    /*console.log(message);*/
  }

  async evtLogin(@Session() session: Record<string, any>, createAuthDto: createAuthDto): Promise<Observable<User | Errors>> {
    return from(this.prismaService.user.findFirst({
      where: {
        email: createAuthDto.email,
      },
    })).pipe(      
      switchMap((user) => {
        if(user) {
          return from(bcrypt.compare(createAuthDto.password, user.password))
            .pipe(
              map(passwordIsCorrect => passwordIsCorrect),
              switchMap((passwordIsMatch) => {               
                if(passwordIsMatch) {
                  const payload = createAuthDto;
                  return from(this.jwtService.signAsync(payload)).pipe(
                    map((access_token) => {
                      return {
                        ...user,
                            access_token
                      };
                    })
                  );
                } else {
                  return of({ msg:'Contraseña incorrecta', status: HttpStatus.UNAUTHORIZED });
                }
              }),
             catchError((error) => of({ msg: 'password no coincide', error, status: HttpStatus.UNAUTHORIZED }))
            );
        } else {
          return of({ msg: 'No existe usuario registrado en nuestra bd con ese email', status: HttpStatus.NOT_FOUND});
        }
      }),
      catchError((error) => of({ msg: 'error al iniciar sesion', error, status: HttpStatus.CONFLICT }))
    );

  }
}
