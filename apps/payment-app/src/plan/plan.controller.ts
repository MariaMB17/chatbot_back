import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Observable, catchError, map, of } from 'rxjs';
import { Plan } from '@prisma/client';
import { Errors } from 'core/interface/interface-error';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @EventPattern('createPlan')
  create(@Payload() createPlanDto: CreatePlanDto):Observable<Plan | Errors> {
    return this.planService.create(createPlanDto).pipe(
      map((dataPlan) => dataPlan),
      catchError((error) => of({ msg: 'password no coincide', error, status: HttpStatus.CONFLICT }))
    );
  }

  @EventPattern('findAllPlan')
  findAll() {
    return this.planService.findAll().pipe(
      map((listPlan) => listPlan),
      catchError((error) => of({ msg: 'error al listar los planes', error, status: HttpStatus.CONFLICT }))
    );
  }

  @MessagePattern('findOnePlan')
  findOne(@Payload() id: number) {
    return this.planService.findOne(id);
  }

  @MessagePattern('updatePlan')
  update(@Payload() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(updatePlanDto.id, updatePlanDto);
  }

  @MessagePattern('removePlan')
  remove(@Payload() id: number) {
    return this.planService.remove(id);
  }
}
