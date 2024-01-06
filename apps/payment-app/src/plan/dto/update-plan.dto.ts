// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePlanDto } from './create-plan.dto';
// import { Prisma } from '@prisma/client';

// export class UpdatePlanDto {
//     plan: {
//         id: number
//         description: string
//         cost: number
//         days: number
//     }
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';

export class UpdatePlanDto extends PartialType(CreatePlanDto) { }
