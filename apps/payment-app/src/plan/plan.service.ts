import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Observable, from, of } from 'rxjs';
import { Plan } from '@prisma/mysql/client';
import { MysqlPrismaService } from 'apps/app-chat-bot/src/database/mysql-prisma.service';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: MysqlPrismaService){}
  create(createPlanDto: CreatePlanDto): Observable<Plan> {
    return from(this.prismaService.plan.create({
      data: createPlanDto.plan
    }));
  }

  findAll() {
    return `This action returns all plan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
