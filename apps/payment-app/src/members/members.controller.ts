import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { CompaniesService } from '@Appchatbot/companies/companies.service';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly companieService: CompaniesService) {}

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
