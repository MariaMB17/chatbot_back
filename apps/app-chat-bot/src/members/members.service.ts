import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { Member } from './entities/member.entity';
import { ProfileService } from '../profile/profile.service';
import { Errors } from 'core/interface/interface-error';
@Injectable()
export class MembersService {

  constructor(
    private readonly userService: UsersService, 
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService) { }

  async create(createMemberDto: CreateMemberDto[]): Promise<Member> {
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
              map((member) => {
                return {
                  ...dataUser,
                  member
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

  async findAll(): Promise<Member[]> {
    return await this.prismaService.member.findMany({
      include: {
        user: {
          include: {
            Profile: {}
          }
        }
      },
    });
  }

  async findOne(id: number): Promise<Member>  {
    return await this.prismaService.member.findFirst({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            Profile: {}
          }
        }
      },
    });
  }

  update(id: number, updateMemberDto: UpdateMemberDto[]) {
    const dataMember = updateMemberDto;
    return from(dataMember).pipe(
      mergeMap((item) => 
        from(this.profileService.update(+item.profile.id, item)).pipe(
          mergeMap(() => 
            from(this.prismaService.member.update({
              where: { id: item.member.id },
              data: item.member,
            }))
          ),
          map(() => ({ item })),
          catchError((error) => of({ msg: 'Error al modificar el usuario y la membresia', error, status: HttpStatus.CONFLICT }))
        )
      ),
      catchError((error) => of({ msg: 'Error al modificar los datos', error, status: HttpStatus.CONFLICT }))
    );  
  }

  async remove(id: number): Promise<Member>  {
    return await this.prismaService.member.delete({
      where: {
        id,
      },
    });
  }
}
