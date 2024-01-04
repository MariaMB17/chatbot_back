import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangerateDto } from './create-exchangerate.dto';

export class UpdateExchangerateDto extends PartialType(CreateExchangerateDto) {
  id: number;
}
