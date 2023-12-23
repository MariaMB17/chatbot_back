import { Prisma } from "@prisma/client";

export class CreateMemberDto {
    member: Prisma.MemberUncheckedCreateInput;
    user: Prisma.UserCreateInput;
    profile: Prisma.ProfileUncheckedCreateInput;
}
