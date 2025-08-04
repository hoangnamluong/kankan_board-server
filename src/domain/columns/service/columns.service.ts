import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/common/interfaces/base_service.interface';
import { Columns } from '../entity/columns.entity';
import { CreateColumnsInput } from '../dto/create_columns.input';
import { UpdateColumnsInput } from '../dto/update_columns.input';

@Injectable()
export class ColumnsService implements IBaseService<Columns> {
  constructor(
    @InjectRepository(Columns)
    private columnsRepo: Repository<Columns>
  ) {}

  async findAll(): Promise<Columns[]> {
    return await this.columnsRepo.find({ relations: ['tasks'] });
  }

  async findOne(id: number): Promise<Columns | null> {
    return await this.columnsRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

  async create(data: CreateColumnsInput): Promise<any> {
    const result = this.columnsRepo.create({
      ...data,
      board: { id: data.board_id },
    });
    return await this.columnsRepo.save(result);
  }

  async update(id: number, data: UpdateColumnsInput): Promise<any> {
    const entity = await this.columnsRepo.findOne({ where: { id } });

    if (entity) {
      return await this.columnsRepo.save({ ...entity, ...data, board: { id: data.board_id } });
    }
  }

  async delete(id: number): Promise<any> {
    return this.columnsRepo.delete({ id });
  }
}
