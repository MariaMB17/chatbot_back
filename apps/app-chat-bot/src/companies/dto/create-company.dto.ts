import { Prisma } from '@prisma/mysql/client';

export class CreateCompanyDto {
    company: Prisma.CompanyCreateInput
    member: Prisma.MemberUncheckedUpdateInput[]
}

export class DataCompany {
    company: CreateCompanyDto
}
