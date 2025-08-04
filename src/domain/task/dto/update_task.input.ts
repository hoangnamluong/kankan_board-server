import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTaskInput } from './create_task.input';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String, { nullable: true })
  title?: string | undefined;

  @Field(() => String, { nullable: true })
  description?: string | undefined;

  @Field(() => Int, { nullable: true })
  position?: number | undefined;

  @Field(() => Int, { nullable: true })
  columns_id?: number | undefined;
}
