import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBaseResolver } from 'src/common/interfaces/base_resolver.interface';
import { CreateTaskInput } from '../dto/create_task.input';
import { UpdateTaskInput } from '../dto/update_task.input';
import { Task } from '../entity/task.entity';
import { TaskService } from '../service/task.service';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt_auth.guard';
import { GqlCacheInterceptor } from 'src/interceptor/gql_cache.interceptor';

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
@UseInterceptors(GqlCacheInterceptor)
export class TaskResolver implements IBaseResolver<Task> {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task, { name: 'createColumn' })
  create(
    @Args('createTaskInput', { type: () => CreateTaskInput }) data: CreateTaskInput
  ): Promise<any> {
    return this.taskService.create(data);
  }

  @Mutation(() => Task, { name: 'updateColumn' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTaskInput', { type: () => UpdateTaskInput }) data: UpdateTaskInput
  ): Promise<any> {
    return this.taskService.update(id, data);
  }

  @Mutation(() => Task, { name: 'deleteColumn' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.taskService.delete(id);
  }
}
