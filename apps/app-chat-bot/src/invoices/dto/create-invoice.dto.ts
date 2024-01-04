import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import * as moment from 'moment';

export class CreateInvoiceDto {
    @IsNotEmpty({ message: 'Debe indicar fecha'})
    //@Transform((fecha: TransformFnParams) => moment(fecha.value).utc().format('YYYY-MM-DD'))
    fecha: Date;
    @IsNotEmpty({ message: 'Debe tener numero de factura'})
    number: string;
    @IsNotEmpty({ message: 'Debe estar totalizada la factura'})
    total: number;
    @IsNotEmpty({ message: 'Debe indicar plan'})
    planId: number;
    @IsNotEmpty({ message: 'Debe indicar compañia'})
    companyId: number;
    @IsNotEmpty({ message: 'Debe indicar moneda'})
    currencyId: number;
}

export class DataInvoice {
    invoice: CreateInvoiceDto
}

