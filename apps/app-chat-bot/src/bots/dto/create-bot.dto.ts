import { Prisma } from '@prisma/mysql/client';
export class CreateBotDto {
    bot: Prisma.BotCreateInput;
    knowledgeIds: number[];
    member_id: number;
}
