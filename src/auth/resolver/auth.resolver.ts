import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from '../dto/login_auth.response';
import { LoginAuthInput } from '../dto/login_auth.input';
import { AuthService } from '../service/auth.service';
import { SignupAuthInput } from '../dto/signup_auth.input';
import { SignupResponse } from '../dto/signup_auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginAuthInput') loginAuthInput: LoginAuthInput) {
    return this.authService.login(loginAuthInput);
  }

  @Mutation(() => SignupResponse)
  signup(@Args('signupAuthInput') signupAuthInput: SignupAuthInput) {
    return this.authService.signup(signupAuthInput);
  }
}
