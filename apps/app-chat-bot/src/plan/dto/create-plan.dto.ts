import { IsNotEmpty } from "class-validator"
export class CreatePlanDto {
    @IsNotEmpty({ message: 'Debe indicar el nombre'})
    name: string;
}

export class DataPlan {
    plan: CreatePlanDto
}
