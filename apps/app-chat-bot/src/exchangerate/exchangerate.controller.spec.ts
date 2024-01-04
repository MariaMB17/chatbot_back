import { Test, TestingModule } from '@nestjs/testing';
import { ExchangerateController } from './exchangerate.controller';
import { JwtService } from '@nestjs/jwt';

describe('ExchangerateController', () => {
  let controller: ExchangerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangerateController],
      providers: [JwtService],
    }).compile();

    controller = module.get<ExchangerateController>(ExchangerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
