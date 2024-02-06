import { Prisma } from '@prisma/mysql/client';

export class CreateProfileDto {
    profile: Prisma.ProfileUncheckedCreateInput
}
export class DataProfile {
    profile: CreateProfileDto
}
