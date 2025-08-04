import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolver } from './task.resolver';
import { TaskService } from '../service/task.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TaskResolver],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
  });

  describe('findAll', () => {
    it('should return an array of tasks from resolver', async () => {
      const result = await resolver.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
