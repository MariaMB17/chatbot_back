import { Test, TestingModule } from '@nestjs/testing';
import { AssociatedCurrenciesController } from './associated-currencies.controller';
import { AssociatedCurrenciesService } from './associated-currencies.service';

describe('AssociatedCurrenciesController', () => {
  let controller: AssociatedCurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociatedCurrenciesController],
      providers: [AssociatedCurrenciesService],
    }).compile();

    controller = module.get<AssociatedCurrenciesController>(AssociatedCurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
