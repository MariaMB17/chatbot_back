import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsOnInvoicesController } from './payment-methods-on-invoices.controller';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';

describe('PaymentMethodsOnInvoicesController', () => {
  let controller: PaymentMethodsOnInvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodsOnInvoicesController],
      providers: [PaymentMethodsOnInvoicesService],
    }).compile();

    controller = module.get<PaymentMethodsOnInvoicesController>(PaymentMethodsOnInvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
