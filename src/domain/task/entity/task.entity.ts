import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Columns } from '../../columns/entity/columns.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('task_pkey', ['id'], { unique: true })
@Entity('task')
export class Task {
  @Field()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Field(() => String, { nullable: true })
  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'position', nullable: true })
  position: number | null;

  @Field(() => Boolean)
  @Column('boolean', { name: 'is_deleted', default: false })
  isDeleted: boolean;

  @Field(() => Columns, { nullable: true })
  @ManyToOne(() => Columns, (columns) => columns.tasks)
  @JoinColumn([{ name: 'column_id', referencedColumnName: 'id' }])
  column: Columns;
}
