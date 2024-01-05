import { Prisma } from '@prisma/mysql/client';
export class UploapKnowledgeDto {
    knowledgeBase: Prisma.KnowledgeBaseCreateManyInput;
    knowledgeFile: Prisma.KnowledgeFileCreateManyInput;
}
