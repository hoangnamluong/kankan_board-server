import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/common/interfaces/base_service.interface';
import { CreateBoardInput } from '../dto/create_board.input';
import { UpdateBoardInput } from '../dto/update_board.input';

@Injectable()
export class BoardService implements IBaseService<Board> {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>
  ) {}

  async findAll(): Promise<Board[]> {
    return await this.boardRepo.find({ relations: ['columns', 'owner'] });
  }

  async findOne(id: number): Promise<Board | null> {
    return await this.boardRepo.findOne({ where: { id }, relations: ['columns', 'owner'] });
  }

  async create(data: CreateBoardInput): Promise<any> {
    const result = this.boardRepo.create({
      ...data,
      owner: { id: data.ownerId },
    });
    return await this.boardRepo.save(result);
  }

  async update(id: number, data: UpdateBoardInput): Promise<any> {
    const entity = await this.boardRepo.findOne({ where: { id } });

    if (entity) {
      return await this.boardRepo.save({ ...entity, ...data });
    }
  }

  async delete(id: number): Promise<any> {
    return this.boardRepo.delete({ id });
  }
}
