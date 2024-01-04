import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Session, UseGuards } from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseMessage } from '../message.decorator';
import { Observable, catchError, map, tap } from 'rxjs';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { Plan } from './entities/plan.entity';

@Controller('plan')
export class PlanController {
  constructor(@Inject('payment-service') private paymentMsService: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan creado con exito')
  create(@Session() sessions: Record<string, any>, @Body() createPlanDto: CreatePlanDto): Observable<Plan> {
    return this.paymentMsService.send('createPlan', createPlanDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de planes')
  findAll(): Observable<Plan[]> {
    return this.paymentMsService.send('findAllPlan', '');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan encontrado con exito')
  findOne(@Param('id') id: string): Observable<Plan> {    
    return this.paymentMsService.send('findOnePlan', +id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan fue modificado con exito')
  update(@Body() updatePlanDto: UpdatePlanDto): Observable<Plan> {
    return this.paymentMsService.send('updatePlan', updatePlanDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan fue eliminado con exito')
  remove(@Param('id') id: string) {
    return this.paymentMsService.send('removePlan', +id);
  }
}
