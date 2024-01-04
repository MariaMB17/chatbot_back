import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodsOnInvoicesService } from './payment-methods-on-invoices.service';

describe('PaymentMethodsOnInvoicesService', () => {
  let service: PaymentMethodsOnInvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodsOnInvoicesService],
    }).compile();

    service = module.get<PaymentMethodsOnInvoicesService>(PaymentMethodsOnInvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
