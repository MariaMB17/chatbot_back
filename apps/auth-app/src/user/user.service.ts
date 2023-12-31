import { Injectable } from '@nestjs/common';
import { MysqlPrismaService } from 'apps/app-chat-bot/src/database/mysql-prisma.service';
import * as bcrypt from 'bcrypt';
import { Observable, from, tap } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<Observable<any>> {
    return from(bcrypt.hash(
      createUserDto.user.password,
      +process.env.BCRYPT_SALT,
    )).pipe(
      tap((encryptedPassword) => console.log(encryptedPassword))
    )
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
