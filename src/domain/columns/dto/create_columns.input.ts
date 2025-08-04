import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateColumnsInput {
  @Field()
  name: string;

  @Field()
  position: number;

  @Field()
  board_id: number;
}
