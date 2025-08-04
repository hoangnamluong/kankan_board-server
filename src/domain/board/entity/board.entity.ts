import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entity/users.entity';
import { Columns } from '../../columns/entity/columns.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('board_pkey', ['id'], { unique: true })
@Entity('board')
export class Board {
  @Field()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Field()
  @Column('boolean', { name: 'is_deleted', default: false })
  isDelete: boolean;

  @Field(() => Users, { nullable: true })
  @ManyToOne(() => Users, (users) => users.boards)
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Users;

  @Field(() => [Columns], { nullable: true })
  @OneToMany(() => Columns, (columns) => columns.board)
  columns: Columns[];
}
