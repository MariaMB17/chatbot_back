import { Prisma } from '@prisma/mysql/client';
export class CreateKnowledgeDto {
  knowledge: Prisma.KnowledgeCreateInput;
  member_id: number;
}
