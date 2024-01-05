import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/mysql/client';
import { MysqlPrismaService } from '../database/mysql-prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  async create(createProfileDto: CreateProfileDto) {
    let dataP = createProfileDto.profile
    dataP.age = +dataP.age
    return await this.prismaService.profile.create({
      data: dataP,
    })
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.prismaService.profile.update({
      where: {
        id,
      },
      data: updateProfileDto.profile,
    });
  }

  async remove(id: number): Promise<Profile> {
    return await this.prismaService.profile.delete({
      where: {
        userId: id,
      },
    });
  }
}
