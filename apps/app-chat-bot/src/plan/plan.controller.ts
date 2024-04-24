import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../message.decorator';
import { CreatePlanDto, DataPlan } from './dto/create-plan.dto';
import { Plan } from './entities/plan.entity';

@Controller('plan')
export class PlanController {
  constructor(@Inject('payment-service') private paymentMsService: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan creado con exito')
  create(@Session() sessions: Record<string, any>,
    @Body() createPlanDto: CreatePlanDto): Observable<Plan> {
    const dataPlan = this._dataPlan(createPlanDto)
    return this.paymentMsService.send('createPlan', dataPlan)
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

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan fue modificado con exito')
  update(@Param('id') id: string, @Body() updatePlanDto: CreatePlanDto): Observable<Plan> {
    const dataPayment = {
      id: +id,
      ...this._dataPlan(updatePlanDto)
    }
    return this.paymentMsService.send('updatePlan', dataPayment)
  }

  @Get('/filtered/searchString')
  @UseGuards(AuthGuard)
  @ResponseMessage('Listado de planes')
  getFilteredPlans(@Query() query: { searchString: string }): Observable<Plan[]> {
    return this.paymentMsService.send('filteredPlan', query.searchString)    
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan fue eliminado con exito')
  remove(@Param('id') id: string) {
    return this.paymentMsService.send('removePlan', +id);
  }

  private _dataPlan(data: CreatePlanDto) {
    let dataPlan = new DataPlan()
    dataPlan.plan = data
    return dataPlan
  }
}
