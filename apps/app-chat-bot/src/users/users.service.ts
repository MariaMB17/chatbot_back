import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {  catchError, from, map, of, switchMap, tap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { ProfileService } from '../profile/profile.service';
import { Errors } from 'core/interface/interface-error';

@Injectable()
export class UsersService {
  
  constructor(
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService){}

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
          catchError((error) => of({ msg: 'No se pudo guardar el usuario', error}))
        )
      }),
      catchError((error) => of( { msg: 'Error al guardar el usuario', error, status: HttpStatus.CONFLICT}))
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
