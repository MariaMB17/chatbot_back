import { Prisma } from '@prisma/mysql/client';

export class CreatePlanDto {
    plan: Prisma.PlanCreateInput
}

export class DataPlan {
    plan: CreatePlanDto
}
