import { Prisma } from "@prisma/mysql/client";

export class CreateProfileDto {
    profile: Prisma.ProfileCreateInput
}

