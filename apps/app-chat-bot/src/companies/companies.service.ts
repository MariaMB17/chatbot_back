import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/mysql/client';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { MembersService } from '../members/members.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: MysqlPrismaService, public memberService: MembersService) { }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.prismaService.company.create({
      data: createCompanyDto.company
    })
    return company;
  }

  async findAll(): Promise<Company[]> {
    return await this.prismaService.company.findMany({
      include: {
        member: {
          include: {
            user: {}
          }
        },
      },
    });
  }

  async findOne(id: number): Promise<Company> {
    return await this.prismaService.company.findFirst({
      where: {
        id,
      },
      include: {
        member: {
          include: {
            user: {}
          }
        },
      },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const data = await this.prismaService.company.update({
      where: { id }, data: updateCompanyDto.company,
    });

    /*let memberData = updateCompanyDto.member
    const result = await Promise.all(memberData.map((an: Member ) => this.memberService.update(an.id, {"member":{...an}})))*/
    return data
  }

  async remove(id: number): Promise<Company> {
    return await this.prismaService.company.delete({
      where: { id }
    })
  }
}
