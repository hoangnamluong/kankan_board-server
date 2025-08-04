import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
