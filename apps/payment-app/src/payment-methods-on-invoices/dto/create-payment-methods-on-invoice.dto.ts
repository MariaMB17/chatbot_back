import { Prisma } from "@prisma/client";

export class CreatePaymentMethodsOnInvoiceDto {
    paymentMethodsOnInvoice: Prisma.PaymentMethodOnInvoiceCreateInput
}
