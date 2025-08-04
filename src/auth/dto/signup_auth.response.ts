import { ObjectType } from '@nestjs/graphql';
import { LoginResponse } from './login_auth.response';

@ObjectType()
export class SignupResponse extends LoginResponse {}
