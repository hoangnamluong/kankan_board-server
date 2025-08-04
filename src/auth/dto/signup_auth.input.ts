import { InputType } from '@nestjs/graphql';
import { CreateUsersInput } from 'src/domain/users/dto/create_users.input';

@InputType()
export class SignupAuthInput extends CreateUsersInput {}
