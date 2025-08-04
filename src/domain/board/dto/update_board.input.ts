import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBoardInput } from './create_board.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
  @Field(() => String, { nullable: true })
  name?: string | undefined;

  @Field(() => Int, { nullable: true })
  ownerId?: number | undefined;
}
