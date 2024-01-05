import { IsNotEmpty, IsPositive, isNumber } from "class-validator";

export class CreateExchangerateDto {
    id?: number
    @IsNotEmpty({ message: 'Debe indicar descripcion'})
    description: string;
    @IsNotEmpty({ message: 'Debe indicar la moneda base'})
    currencyIdbase: number;
    @IsNotEmpty({ message: 'Debe indicar la moneda foranea'})
    foreigncurrencyId: number;
    @IsPositive({ message: 'el valor de la moneda base debe ser mayor a 0'})
    mountCurrencyBse: number;
    @IsPositive({ message: 'el valor de la conversion debe ser mayor a 0'})
    currencyconversion: number;
}

export class DataExchangerate {
    exchangerate: CreateExchangerateDto
}

