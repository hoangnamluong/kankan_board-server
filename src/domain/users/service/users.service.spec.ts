import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users from service', async () => {
      const result = await service.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
