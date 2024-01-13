import { HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { User } from '@prisma/mysql/client';
import * as bcrypt from 'bcrypt';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { AllExceptionFilter } from '../allexceptionsfilter';
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
            // Add Member **************************/
            const createMember = async () => {
              const { name } = createUserDto;
              let companyId = 0;
              const result = await this.prismaService.company.findUnique({
                where: {
                  name
                }
              })
              if (result) {
                companyId = result.id;
              } else {
                const response = await this.prismaService.company.create({
                  data: { name }
                })
                companyId = response.id;
              }
              const objectMember = {
                userId: user.id,
                companyId,
                planId: 1, // Default "FREE"
              }
              await this.prismaService.member.create({
                data: { ...objectMember }
              })
            }
            createMember();
            //*********************************** */

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
                    profile,
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

  @UseFilters(AllExceptionFilter)
  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      include: {
        Profile: {},
      },
    });
  }

  @UseFilters(AllExceptionFilter)
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

  @UseFilters(AllExceptionFilter)
  async remove(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: { id }
    })
  }
}