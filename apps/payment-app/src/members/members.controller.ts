import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Errors } from 'core/interface/interface-error';
import { Observable, catchError, map, of } from 'rxjs';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';

@Controller()
export class MembersController {
  constructor(
    private readonly membersService: MembersService) { }

  @EventPattern('createMember')
  create(@Payload() createMemberDto: CreateMemberDto): Observable<Member | Errors> {
    return this.membersService.create(createMemberDto).pipe(
      map((dataMember) => dataMember),
      catchError((error) => of({ msg: 'Error al crear al miembro', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('findAllMembers')
  findAll(): Observable<Member | Errors> {
    return this.membersService.findAll().pipe(
      map((listMember) => listMember),
      catchError((error) => of({ msg: 'Error al listar los miembros', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('findOneMember')
  findOne(@Payload() id: number): Observable<Member | Errors> {
    return this.membersService.findOne(id).pipe(
      map((member) => member),
      catchError((error) => of({ msg: 'Error al encontrar al miembro', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('updateMember')
  update(@Payload() updateMemberDto: UpdateMemberDto): Observable<Member> {
    return this.membersService.update(updateMemberDto.id, updateMemberDto).pipe(
      map((member) => member),
      catchError((error) => of({ msg: 'Error al modificar al miembro', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('removeMember')
  remove(@Payload() id: number): Observable<Member> {
    return this.membersService.remove(id);
  }
}
