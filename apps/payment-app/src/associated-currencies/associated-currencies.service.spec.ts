import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedCurrenciesService } from './associated-currencies.service';

describe('AssociatedCurrenciesService', () => {
  let service: AssociatedCurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociatedCurrenciesService],
    }).compile();

    service = module.get<AssociatedCurrenciesService>(AssociatedCurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
