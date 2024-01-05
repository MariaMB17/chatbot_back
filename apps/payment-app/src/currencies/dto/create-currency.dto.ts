import { Prisma } from "@prisma/client";

export class CreateCurrencyDto {
    currency: Prisma.CurrencyCreateInput
}
