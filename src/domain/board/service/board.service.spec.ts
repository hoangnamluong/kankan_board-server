import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  describe('findAll', () => {
    it('should return an array of boards from service', async () => {
      const result = await service.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
