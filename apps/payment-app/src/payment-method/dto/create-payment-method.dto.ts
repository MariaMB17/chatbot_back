import { Prisma } from "@prisma/mysql/client";

export class CreatePaymentMethodDto {
    paymentMethod: Prisma.PaymentMethodCreateInput
}
