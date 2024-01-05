import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCurrencyDto {
    id?: number
    @IsNotEmpty({ message: 'Debe indicar codigo de la moneda'})
    code: string;
    @IsNotEmpty({ message: 'Debe indicar descripcion'})
    description: string;
    @IsNotEmpty({ message: 'Debe indicar simbolo'})
    @MaxLength(2, { message: 'El simbolo no puede tener más de 2 caracteres' })
    symbol: string;
}

export class DataCurrency {
    currency: CreateCurrencyDto
}
