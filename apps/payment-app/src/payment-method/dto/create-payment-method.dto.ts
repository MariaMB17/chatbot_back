import { Prisma } from "@prisma/client";

export class CreatePaymentMethodDto {
    paymentMethod: Prisma.PaymentMethodCreateInput
}
