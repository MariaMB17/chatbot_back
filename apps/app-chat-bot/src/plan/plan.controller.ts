import { Body, Controller, Inject, Post, Session, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'apps/auth-app/src/auth.guard';
import { ResponseMessage } from '../message.decorator';
import { CreatePlanDto } from './dto/create-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(@Inject('payment-service') private paymentMsService: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Plan creado con exito')
  create(@Session() sessions: Record<string, any>, @Body() createPlanDto: CreatePlanDto) {
    return this.paymentMsService.send('createPlan', createPlanDto)
  }

  // @Get()
  // findAll() {
  //   return this.planService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.planService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
  //   return this.planService.update(+id, updatePlanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.planService.remove(+id);
  // }
}
