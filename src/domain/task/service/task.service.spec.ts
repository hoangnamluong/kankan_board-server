import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('findAll', () => {
    it('should return an array of tasks from service', async () => {
      const result = await service.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
