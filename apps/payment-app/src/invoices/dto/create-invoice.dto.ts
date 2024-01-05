import { Prisma } from "@prisma/client";

export class CreateInvoiceDto {
    invoice: Prisma.InvoiceCreateInput
}
