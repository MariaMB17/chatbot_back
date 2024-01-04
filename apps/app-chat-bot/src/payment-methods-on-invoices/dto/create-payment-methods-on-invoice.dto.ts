import { IsNotEmpty, IsPositive } from "class-validator";

export class CreatePaymentMethodsOnInvoiceDto {
    id?: number
    @IsNotEmpty({ message: 'Debe indicar la factura'})
    invoiceId: number;
    @IsNotEmpty({ message: 'Debe indicar el metodo de pago'})
    paymentMethodId: number;
    @IsPositive({ message: 'El total debe ser mayor a 0'})
    amount: number;
}

export class DataPaymentMethodsOnInvoice {
    paymentMethodsOnInvoice: CreatePaymentMethodsOnInvoiceDto
}
