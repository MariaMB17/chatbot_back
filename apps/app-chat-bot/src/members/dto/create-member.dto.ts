import { Prisma } from '@prisma/mysql/client';

export class CreateMemberDto {
    member: Prisma.MemberCreateInput
}
