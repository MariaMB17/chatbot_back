import { IsNotEmpty } from "class-validator"

export class CreatePaymentMethodDto {
    @IsNotEmpty({ message: 'Debe indicar codigo la descripcion'})
    description: string;
}

export class DataPaymentMethod {
    paymentMethod: CreatePaymentMethodDto
}
