import { Prisma } from '@prisma/mysql/client';
export class UpdateKnowledgeDto {
    knowledge: Prisma.KnowledgeUpdateInput;

}
