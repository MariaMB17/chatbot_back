import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  create(createUserDto: CreateUserDto) {
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
            if (createUserDto.profile) {
              return from(this.prismaService.profile.create({
                data: {
                  ...createUserDto.profile,
                  userId: user.id,
                },
              })).pipe(
                map((profile) => {
                  return {
                    user,
                    profile
                  }
                })
              )
            } else {
              return of(null)
            }
          }),
          catchError((error) => of({ msg: 'No se pudo guardar el usuario', error }))
        )
      }),
      catchError((error) => of({ msg: 'Error al guardar el usuario', error, status: HttpStatus.CONFLICT }))
    )
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      include: {
        Profile: {},
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
      include: {
        Profile: {
          include: {},
        },
      },
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id }
    })
  }
}
