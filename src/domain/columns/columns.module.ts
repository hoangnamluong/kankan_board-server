import { Module } from '@nestjs/common';
import { Columns } from './entity/columns.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsService } from './service/columns.service';
import { ColumnsResolver } from './resolver/columns.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Columns])],
  providers: [ColumnsService, ColumnsResolver],
})
export class ColumnsModule {}
