import { Prisma } from "@prisma/mysql/client";

export class CreateCompanyDto {
    company: Prisma.CompanyCreateInput
}