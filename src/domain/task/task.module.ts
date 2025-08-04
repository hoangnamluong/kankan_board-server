import { Module } from '@nestjs/common';
import { Task } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './service/task.service';
import { TaskResolver } from './resolver/task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
