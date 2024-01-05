import { Prisma } from "@prisma/mysql/client";

export class CreateInvoiceDto {
    invoice: Prisma.InvoiceCreateInput
}
