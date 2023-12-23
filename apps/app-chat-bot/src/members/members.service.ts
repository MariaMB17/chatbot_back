import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from '@prisma/client';
import { Observable, catchError, from, lastValueFrom, map, mergeMap, of, tap, toArray } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MembersService {

  constructor(private readonly userService: UsersService, private readonly prismaService: PrismaService) { }

  async create(createMemberDto: CreateMemberDto[]): Promise<any> {
    const dataMember = createMemberDto;
    return from(dataMember).pipe(
      mergeMap(
        ({member, ...dataUser}) => this.userService.create(dataUser).pipe(
          mergeMap((userProfile: any) => {
            return from(this.prismaService.member.create({
              data: {
                ...member,
                userId: userProfile.user.id
              },
            })).pipe(
              map((data) => {
                return {
                  ...dataUser,
                  data
                }
              }),
              catchError((error) => of({ msg: 'Error al guardar el usuario de la membresia', error, status: HttpStatus.CONFLICT }))
            )
          }), catchError((error) => of({ msg: 'Error al guardar el usuario de la compañia', error, status: HttpStatus.CONFLICT }))
        )
      ),
      catchError((error) => of({ msg: 'Error al guardar el usuario y la membresia', error, status: HttpStatus.CONFLICT }))
    )    
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
