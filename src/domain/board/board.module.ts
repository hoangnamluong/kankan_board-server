import { Module } from '@nestjs/common';
import { Board } from './entity/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardResolver } from './resolver/board.resolver';
import { BoardService } from './service/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardService, BoardResolver],
})
export class BoardModule {}
