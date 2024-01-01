import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Observable, from, of } from 'rxjs';
import { Plan } from '@prisma/client';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService){}
  create(createPlanDto: CreatePlanDto): Observable<Plan> {
    return from(this.prismaService.plan.create({
      data: createPlanDto.plan
    }));
  }

  findAll(): Observable<Plan[]> {
    return from(this.prismaService.plan.findMany({
      include: {
        member: {
          include: {
            user: {}
          }
        },
        invoice: {
          
        }
      }
    }))
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
