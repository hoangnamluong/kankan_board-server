import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBaseResolver } from 'src/common/interfaces/base_resolver.interface';
import { CreateBoardInput } from '../dto/create_board.input';
import { UpdateBoardInput } from '../dto/update_board.input';
import { Board } from '../entity/board.entity';
import { BoardService } from '../service/board.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt_auth.guard';
import { GqlCacheInterceptor } from 'src/interceptor/gql_cache.interceptor';

@Resolver(() => Board)
@UseGuards(JwtAuthGuard)
@UseInterceptors(GqlCacheInterceptor)
export class BoardResolver implements IBaseResolver<Board> {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board], { name: 'boards' })
  findAll() {
    return this.boardService.findAll();
  }

  @Query(() => Board, { name: 'board' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.boardService.findOne(id);
  }

  @Mutation(() => Board, { name: 'createBoard' })
  create(
    @Args('createBoardInput', { type: () => CreateBoardInput }) data: CreateBoardInput
  ): Promise<any> {
    return this.boardService.create(data);
  }

  @Mutation(() => Board, { name: 'updateBoard' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBoardInput', { type: () => UpdateBoardInput }) data: UpdateBoardInput
  ): Promise<any> {
    return this.boardService.update(id, data);
  }

  @Mutation(() => Board, { name: 'deleteBoard' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.boardService.delete(id);
  }
}
