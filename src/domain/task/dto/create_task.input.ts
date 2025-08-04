import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  position: number;

  @Field()
  columns_id: number;
}
