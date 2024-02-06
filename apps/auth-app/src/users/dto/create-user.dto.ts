import { Prisma } from '@prisma/mysql/client';

export class CreateUserDto {
    user: Prisma.UserCreateInput;
    profile: Prisma.ProfileUncheckedCreateInput;
    name: string;    //name Company
}
