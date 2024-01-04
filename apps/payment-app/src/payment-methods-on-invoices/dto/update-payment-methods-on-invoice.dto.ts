import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMethodsOnInvoiceDto } from './create-payment-methods-on-invoice.dto';

export class UpdatePaymentMethodsOnInvoiceDto extends PartialType(CreatePaymentMethodsOnInvoiceDto) {
  id: number;
}
