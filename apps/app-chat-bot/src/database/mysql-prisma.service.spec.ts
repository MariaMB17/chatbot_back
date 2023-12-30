import { Test, TestingModule } from '@nestjs/testing';
import { MysqlPrismaService } from './mysql-prisma.service';

describe('MysqlPrismaService', () => {
  let service: MysqlPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MysqlPrismaService],
    }).compile();

    service = module.get<MysqlPrismaService>(MysqlPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
