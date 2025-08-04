import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/common/interfaces/base_service.interface';
import { CreateTaskInput } from '../dto/create_task.input';
import { UpdateTaskInput } from '../dto/update_task.input';

@Injectable()
export class TaskService implements IBaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find({ relations: ['columns'] });
  }

  async findOne(id: number): Promise<Task | null> {
    return await this.taskRepo.findOne({ where: { id }, relations: ['columns'] });
  }

  async create(data: CreateTaskInput): Promise<any> {
    const result = this.taskRepo.create({
      ...data,
      column: { id: data.columns_id },
    });
    return await this.taskRepo.save(result);
  }

  async update(id: number, data: UpdateTaskInput): Promise<any> {
    const entity = await this.taskRepo.findOne({ where: { id } });

    if (entity) {
      return await this.taskRepo.save({ ...entity, ...data, column: { id: data.columns_id } });
    }
  }

  async delete(id: number): Promise<any> {
    return this.taskRepo.delete({ id });
  }
}
