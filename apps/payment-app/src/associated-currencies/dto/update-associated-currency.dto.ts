import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociatedCurrencyDto } from './create-associated-currency.dto';

export class UpdateAssociatedCurrencyDto extends PartialType(CreateAssociatedCurrencyDto) {
  id: number;
}
