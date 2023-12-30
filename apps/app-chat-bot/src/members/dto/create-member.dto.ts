import { Prisma } from '@prisma/mysql/client';

export class CreateMemberDto {
    member: Prisma.MemberUncheckedCreateInput;
    user: Prisma.UserCreateInput;
    profile: Prisma.ProfileUncheckedCreateInput;
}
