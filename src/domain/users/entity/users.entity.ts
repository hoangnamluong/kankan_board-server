import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../board/entity/board.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Index('users_pkey', ['id'], { unique: true })
@Entity('users')
export class Users {
  @Field()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Field(() => String)
  @Column('character varying', { name: 'email', nullable: false, length: 255 })
  email: string;

  @Field(() => String)
  @Column('character varying', { name: 'password', nullable: false, length: 255 })
  password: string;

  @Field(() => Boolean)
  @Column('boolean', { name: 'is_active', default: true })
  isActive: boolean;

  @Field(() => [Board], { nullable: true })
  @OneToMany(() => Board, (board) => board.owner)
  boards: Board[];
}
