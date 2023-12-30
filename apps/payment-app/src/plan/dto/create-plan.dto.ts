import { Prisma } from '@prisma/mysql/client';

export class CreatePlanDto {
    plan: Prisma.PlanCreateInput
}
