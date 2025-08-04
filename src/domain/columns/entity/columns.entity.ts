import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Task } from '../../task/entity/task.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('columns_pkey', ['id'], { unique: true })
@Entity('columns')
export class Columns {
  @Field()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Field()
  @Column('integer', { name: 'position' })
  position: number;

  @Field(() => Boolean)
  @Column('boolean', { name: 'is_deleted', default: false })
  isDelete: boolean;

  @Field(() => Board, { nullable: true })
  @ManyToOne(() => Board, (board) => board.columns)
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
