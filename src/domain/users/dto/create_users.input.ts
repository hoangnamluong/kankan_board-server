import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUsersInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
