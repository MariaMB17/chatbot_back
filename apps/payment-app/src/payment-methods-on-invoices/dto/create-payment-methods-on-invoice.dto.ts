import { Prisma } from "@prisma/mysql/client";

export class CreatePaymentMethodsOnInvoiceDto {
    paymentMethodsOnInvoice: Prisma.PaymentMethodOnInvoiceCreateInput
}
