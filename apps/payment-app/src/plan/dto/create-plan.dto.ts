import { Prisma } from "@prisma/client";

export class CreatePlanDto {
    plan: Prisma.PlanCreateInput
}
