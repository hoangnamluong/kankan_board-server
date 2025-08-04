import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUsersInput } from './create_users.input';

@InputType()
export class UpdateUsersInput extends PartialType(CreateUsersInput) {
  @Field(() => String)
  name?: string | undefined;

  @Field(() => String)
  email?: string | undefined;
}
