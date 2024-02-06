
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/mysql/client';
import { Observable, from } from 'rxjs';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: MysqlPrismaService) { }
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
            user: {
              include: {
                Profile: {}
              }
            }
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

  remove(id: number): Observable<Plan> {
    return from(this.prismaService.plan.delete({ where: { id } }));
  }
}
