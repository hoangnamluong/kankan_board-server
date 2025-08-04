import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from '../service/users.service';

describe('BoardResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersResolver],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  describe('findAll', () => {
    it('should return an array of boards from resolver', async () => {
      const result = await resolver.findAll();

      expect(result.length).toBeGreaterThan(0);
    });
  });
});
