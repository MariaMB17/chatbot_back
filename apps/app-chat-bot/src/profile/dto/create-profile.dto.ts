import { Prisma } from "@prisma/client";

export class CreateProfileDto {
    profile: Prisma.ProfileCreateInput
}
