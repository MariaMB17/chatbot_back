import { Prisma } from "@prisma/client"

export class CreateCompanyDto {
    company: Prisma.CompanyCreateInput
    member: Prisma.MemberUncheckedUpdateInput[]
}
