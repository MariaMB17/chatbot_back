import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';
import { Observable, from, of, tap } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService){}
  
  async createUser(createUserDto: CreateUserDto): Promise<Observable<any>> {
    return from(bcrypt.hash(
      createUserDto.user.password,
      +process.env.BCRYPT_SALT,
    )).pipe(
      tap((encryptedPassword) => console.log(encryptedPassword) )
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
