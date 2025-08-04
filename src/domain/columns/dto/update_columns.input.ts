import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateColumnsInput } from './create_columns.input';

@InputType()
export class UpdateColumnsInput extends PartialType(CreateColumnsInput) {
  @Field(() => String, { nullable: true })
  name?: string | undefined;

  @Field(() => Int, { nullable: true })
  position?: number | undefined;

  @Field(() => Int, { nullable: true })
  board_id?: number | undefined;
}
