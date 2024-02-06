import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Observable, from } from 'rxjs';
import { Profile } from './entities/profile.entity';
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  create(createProfileDto: CreateProfileDto): Observable<Profile> {
    let dataP = createProfileDto.profile
    dataP.age = +dataP.age
    return from(this.prismaService.profile.create({
      data: dataP,
    }));
  }

  update(id: number, updateProfileDto: UpdateProfileDto): Observable<Profile> {
    return from(this.prismaService.profile.update({
      where: { id },
      data: updateProfileDto.profile,
    }));
  }

  remove(id: number):Observable<Profile> {
    return from(this.prismaService.profile.delete({ where: { id } }));
  }
}
