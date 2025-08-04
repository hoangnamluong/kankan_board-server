import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBaseService } from 'src/common/interfaces/base_service.interface';
import { CreateUsersInput } from '../dto/create_users.input';
import { UpdateUsersInput } from '../dto/update_users.input';
import { Users } from '../entity/users.entity';

@Injectable()
export class UsersService implements IBaseService<Users> {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepo.find();
  }

  async findOne(id: number): Promise<Users | null> {
    return await this.usersRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.usersRepo.findOne({ where: { email } });
  }

  async create(data: CreateUsersInput): Promise<Users> {
    const result = this.usersRepo.create({
      ...data,
    });
    return await this.usersRepo.save(result);
  }

  async update(id: number, data: UpdateUsersInput): Promise<any> {
    const entity = await this.usersRepo.findOne({ where: { id } });

    if (entity) {
      return await this.usersRepo.save({ ...entity, ...data });
    }
  }

  async delete(id: number): Promise<any> {
    return this.usersRepo.delete({ id });
  }
}
