import { Prisma } from "@prisma/mysql/client";

export class CreateAssociatedCurrencyDto {
    associatedCurrency: Prisma.AssociatedCurrencyCreateInput

}
