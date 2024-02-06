import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
  create(createMemberDto: CreateMemberDto): Observable<Member> {
    return from(this.prismaService.member.create({
      data: createMemberDto.member
    }));
  }

  findAll(): Observable<Member[]> {
    return from(this.prismaService.member.findMany({
      include: {
        company: {},
        plan: {},
        user: {},
      }
    }))
  }

  findOne(id: number): Observable<Member> {
    return from(this.prismaService.member.findFirst({
      where: { id },
      include: {
        company: {},
        plan: {},
        user: {},
      }
    }))
  }

  update(id: number, updateMemberDto: UpdateMemberDto): Observable<Member> {
    return from(this.prismaService.member.update({
      where: { id }, data: updateMemberDto,
    }));
  }

  remove(id: number): Observable<Member> {
    return from(this.prismaService.member.delete({ where: { id } }));
  }
}
