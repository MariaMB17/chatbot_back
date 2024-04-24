
import { MysqlPrismaService } from '@Appchatbot/database/mysql-prisma.service';
import { Injectable, Query, UseFilters } from '@nestjs/common';
import { Plan } from '@prisma/mysql/client';
import { Observable, from } from 'rxjs';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AllExceptionFilter } from '@Appchatbot/allexceptionsfilter';

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: MysqlPrismaService) { }

  @UseFilters(AllExceptionFilter)
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

  getFilteredPlans(searchString: string): Observable<Plan[]> {
    return from(this.prismaService.plan.findMany({
      where: {
        OR: [
          {
            name: { contains: searchString },
          }/*,
          {
            content: { contains: searchString },
          },*/
        ],
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
    }));
  }


  update(id: number, updatePlanDto: UpdatePlanDto): Observable<Plan> {
    return from(this.prismaService.plan.update({
      where: { id }, 
      data: updatePlanDto.plan,
    }));
  }

  remove(id: number): Observable<Plan> {
    return from(this.prismaService.plan.delete({ where: { id } }));
  }
}
