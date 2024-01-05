import { Prisma } from "@prisma/mysql/client";

export class CreateCurrencyDto {
    currency: Prisma.CurrencyCreateInput
}
