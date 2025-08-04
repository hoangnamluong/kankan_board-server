import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsService } from './columns.service';

describe('ColumnsService', () => {
  let service: ColumnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsService],
    }).compile();

    service = module.get<ColumnsService>(ColumnsService);
  });

  describe('findAll', () => {
    it('should return an array of columns from service', async () => {
      const result = await service.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
