import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../prisma.service';
import { MembersService } from '../members/members.service';
import { Company, Member } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: PrismaService, public memberService: MembersService) {}
  
  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.prismaService.company.create({
      data: createCompanyDto.company
    })
    if(company?.id) {
      const { id } = company
      let memberData = createCompanyDto.member
      const dataMemb = memberData.map((item: Member) => {
        item.companyId = id
        return item
      })      
      const result = await Promise.all(dataMemb.map((an) => this.memberService.create({"member":{...an}})))
    }    
    return company;
  }

  async findAll(): Promise<Company[]>  {
    return await this.prismaService.company.findMany({
      include: {
        member: {},
      },
    });
  }

  async findOne(id: number): Promise<Company> {
    return await this.prismaService.company.findFirst({
      where: {
        id,
      },
      include: {
        member: {},
      },
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>  {
    const data = await this.prismaService.company.update({
      where: { id }, data: updateCompanyDto.company,
    });

    let memberData = updateCompanyDto.member
    const result = await Promise.all(memberData.map((an: Member ) => this.memberService.update(an.id, {"member":{...an}})))
    return data
  }

  async remove(id: number) : Promise<Company> {
    return await this.prismaService.company.delete({
      where: { id }
    })
  }
}