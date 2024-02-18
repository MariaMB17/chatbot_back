import { MysqlPrismaService } from '@PrismaServiceMysql';
import { HttpStatus, Injectable, Session } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/mysql/client';
import * as bcrypt from 'bcrypt';
import { Errors } from 'core/interface/interface-error';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { createAuthDto } from './dtos/login.dto';

@Injectable()
export class AuthAppService {
  constructor(
    private readonly prismaService: MysqlPrismaService,
    private readonly jwtService: JwtService,
  ) { }

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
        if (user) {
          return from(bcrypt.compare(createAuthDto.password, user.password))
            .pipe(
              map(passwordIsCorrect => passwordIsCorrect),
              switchMap((passwordIsMatch) => {
                if (passwordIsMatch) {
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
                  return of({
                    msg: 'Contraseña incorrecta',
                    status: HttpStatus.UNAUTHORIZED
                  });
                }
              }),
              catchError((error) => of({
                msg: 'password no coincide',
                error,
                status: HttpStatus.UNAUTHORIZED
              }))
            );
        } else {
          return of({
            msg: 'No existe usuario registrado en nuestra bd con ese email',
            status: HttpStatus.NOT_FOUND
          });
        }
      }),
      catchError((error) => of({
        msg: 'error al iniciar sesion',
        error,
        status: HttpStatus.CONFLICT
      }))
    );
  }
}
