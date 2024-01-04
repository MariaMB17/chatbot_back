import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Observable, from, of } from 'rxjs';
import { PrismaService } from 'apps/app-chat-bot/src/prisma.service';
import { Plan } from 'apps/app-chat-bot/src/plan/entities/plan.entity';

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

  findOne(id: number): Observable<Plan> {
    return from(this.prismaService.plan.findFirst({
      where: {
        id,
      },
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

  update(id: number, updatePlanDto: UpdatePlanDto): Observable<Plan> {
    return from(this.prismaService.plan.update({
      where: { id }, data: updatePlanDto.plan,
    }));
  }

  remove(id: number): Observable<Plan>  {
    return from(this.prismaService.plan.delete({ where: { id }}));
  }
}
