import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Errors } from 'core/interface/interface-error';
import { Plan } from 'apps/app-chat-bot/src/plan/entities/plan.entity';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @EventPattern('createPlan')
  create(@Payload() createPlanDto: CreatePlanDto):Observable<Plan | Errors> {
    return this.planService.create(createPlanDto).pipe(
      map((dataPlan) => dataPlan),
      catchError((error) => of({ msg: 'El plan no pudo ser creado', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('findAllPlan')
  findAll(): Observable<Plan> {
    return this.planService.findAll().pipe(
      map((listPlan) => listPlan),
      catchError((error) => of({ msg: 'error al listar los planes', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('findOnePlan')
  findOne(@Payload() id: number): Observable<Plan> {
    return this.planService.findOne(id).pipe(
      map((listPlan) => listPlan),
      catchError((error) => of({ msg: 'error al encontrar el plan', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('updatePlan')
  update(@Payload() updatePlanDto: UpdatePlanDto): Observable<Plan> {
    return this.planService.update(updatePlanDto.plan.id, updatePlanDto).pipe(
      map((plan) => plan),
      catchError((error) => of({ msg: 'error al modificar el plan', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('removePlan')
  remove(@Payload() id: number) {
    return this.planService.remove(id).pipe(
      map((plan) => plan),
      catchError((error) => of({ msg: 'error al eliminar el plan', error, status: HttpStatus.CONFLICT }))
    );
  }
}
