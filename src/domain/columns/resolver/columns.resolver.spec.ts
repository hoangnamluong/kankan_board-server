import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsResolver } from './columns.resolver';
import { ColumnsService } from '../service/columns.service';

describe('ColumnsResolver', () => {
  let resolver: ColumnsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsService, ColumnsResolver],
    }).compile();

    resolver = module.get<ColumnsResolver>(ColumnsResolver);
  });

  describe('findAll', () => {
    it('should return an array of columns from resolver', async () => {
      const result = await resolver.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
