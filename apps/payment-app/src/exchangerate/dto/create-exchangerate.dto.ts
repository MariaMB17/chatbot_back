import { Prisma } from "@prisma/mysql/client";

export class CreateExchangerateDto {
    exchangerate: Prisma.ExchangeRateCreateInput

}
