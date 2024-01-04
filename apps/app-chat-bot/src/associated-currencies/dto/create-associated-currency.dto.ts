import { IsNotEmpty, isNotEmpty } from "class-validator";

export class CreateAssociatedCurrencyDto {
    @IsNotEmpty({ message: 'Debe indicar codigo la descripcion'})
    description: string;

    @IsNotEmpty({ message: 'Debe indicar la moneda'})
    currencyId: number;
}

export class DataAssociatedCurrency {
    associatedCurrency: CreateAssociatedCurrencyDto
}

