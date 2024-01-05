import { Prisma } from "@prisma/client";

export class CreateMemberDto {
    member: Prisma.MemberCreateInput
}
