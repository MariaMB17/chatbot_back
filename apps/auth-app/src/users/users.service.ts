import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/mysql/client';
import { from, of, Observable, switchMap, iif, catchError, tap, map } from 'rxjs';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createUserDto: CreateUserDto) {
    const { name } = createUserDto
    return from(bcrypt.hash(
      createUserDto.user.password,
      +process.env.BCRYPT_SALT,
    )).pipe(
      switchMap((encryptedPassword) => {
        return from(this.prismaService.user.create({
          data: {
            ...createUserDto.user,
            password: encryptedPassword,
          },
        })).pipe(
          switchMap((user) => {
            return iif(
              () => !!createUserDto?.profile,
              from(this.prismaService.profile.create({
                data: {
                  ...createUserDto.profile,
                  userId: user.id,
                },
              })),
              of(null),
            ).pipe(
              switchMap((profile) => from([{ user, profile }])),
              catchError((error) => of({ msg: 'No se pudo crear el usuario y el perfil', error }))
            ).pipe(
              switchMap((data) => {
                return from(this.prismaService.company.findUnique({
                  where: {
                    name
                  }
                })).pipe(
                  switchMap((company) => from([{ ...data, company }])),
                  catchError((error) => of({ msg: 'Error al consultar la compañia', error }))
                )
              })
            ).pipe(
              switchMap((dataRes) => {
                return iif(
                  () => !!dataRes['company'],
                  of(dataRes['company']),
                  from(this.prismaService.company.create({
                    data: { name }
                  })),
                ).pipe(
                  tap((dataCompany) => dataRes['company'] = dataCompany),
                  switchMap(() => from([dataRes])),
                  catchError((error) => of({ msg: 'Error al consultar la compañia', error }))
                )
              })
            ).pipe(
              switchMap((dataResponse) => {
                return from(this.prismaService.member.create({
                  data: {
                    userId: user.id,
                    companyId: dataResponse['company'].id,
                    planId: 1, // Default "FREE"
                  }
                })).pipe(
                  map((member) => {
                    return {
                      ...dataResponse,
                      member
                    }
                  }),
                  catchError((error) => of({ msg: 'Error al crear el miembro', error }))
                )
              })
            )
          }),
          catchError((error) => of({ msg: 'No se pudo crear el usuario', error }))
        )
      }),
      catchError((error) => of({ msg: 'Error al guardar el usuario', error, status: HttpStatus.CONFLICT }))
    )
  }

  findAll(): Observable<User[]>  {
    return from(this.prismaService.user.findMany({
      include: {
        Profile: {},
      },
    }));
  }

  findUserByEmail(email: string): Observable<User> {
    return from(this.prismaService.user.findFirst({
      where: {
        email,
      },
      include: {
        Profile: {
          include: {},
        },
        Member: {
          include: {
            company: {
              include: {},
            }
          },
        }
      },
    }));
  }

  findOne(id: number): Observable<User> {
    return from(this.prismaService.user.findFirst({
      where: {
        id,
      },
      include: {
        Profile: {
          include: {},
        },
        Member: {
          include: {
            company: {
              include: {},
            }
          },
        }
      },
    }));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number): Observable<User> {
    return from(this.prismaService.user.delete({
      where: { id }
    }))
  }
}
