import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBaseResolver } from 'src/common/interfaces/base_resolver.interface';
import { CreateColumnsInput } from '../dto/create_columns.input';
import { UpdateColumnsInput } from '../dto/update_columns.input';
import { Columns } from '../entity/columns.entity';
import { ColumnsService } from '../service/columns.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt_auth.guard';
import { GqlCacheInterceptor } from 'src/interceptor/gql_cache.interceptor';

@Resolver(() => Columns)
@UseGuards(JwtAuthGuard)
@UseInterceptors(GqlCacheInterceptor)
export class ColumnsResolver implements IBaseResolver<Columns> {
  constructor(private readonly columnsService: ColumnsService) {}

  @Query(() => [Columns], { name: 'columns' })
  findAll() {
    return this.columnsService.findAll();
  }

  @Query(() => Columns, { name: 'column' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.columnsService.findOne(id);
  }

  @Mutation(() => Columns, { name: 'createColumn' })
  create(
    @Args('createColumnInput', { type: () => CreateColumnsInput }) data: CreateColumnsInput
  ): Promise<any> {
    return this.columnsService.create(data);
  }

  @Mutation(() => Columns, { name: 'updateColumn' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateColumnInput', { type: () => UpdateColumnsInput }) data: UpdateColumnsInput
  ): Promise<any> {
    return this.columnsService.update(id, data);
  }

  @Mutation(() => Columns, { name: 'deleteColumn' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.columnsService.delete(id);
  }
}
