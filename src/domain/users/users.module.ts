import { Module } from '@nestjs/common';
import { Users } from './entity/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersResolver } from './resolver/users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
