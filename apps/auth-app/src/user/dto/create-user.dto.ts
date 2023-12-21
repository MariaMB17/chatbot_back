import { Prisma } from '@prisma/client';

export class CreateUserDto {
    user: Prisma.UserCreateInput;
    profile: Prisma.ProfileUncheckedCreateInput;
}


