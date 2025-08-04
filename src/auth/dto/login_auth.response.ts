import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Int, { nullable: true })
  id: number | null;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  email: string | null;
}
