import { Test, TestingModule } from '@nestjs/testing';
import { BoardResolver } from './board.resolver';
import { BoardService } from '../service/board.service';

describe('BoardResolver', () => {
  let resolver: BoardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService, BoardResolver],
    }).compile();

    resolver = module.get<BoardResolver>(BoardResolver);
  });

  describe('findAll', () => {
    it('should return an array of boards from resolver', async () => {
      const result = await resolver.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
