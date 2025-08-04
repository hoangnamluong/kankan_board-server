/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EncryptionUtil } from 'src/common/utils/encryption.util';
import { UsersService } from 'src/domain/users/service/users.service';
import { Users } from 'src/domain/users/entity/users.entity';
import { LoginAuthInput } from '../dto/login_auth.input';
import { LoginResponse } from '../dto/login_auth.response';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthInput } from '../dto/signup_auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if (user && EncryptionUtil.compare(pass, user.password)) {
      const { password, isActive, boards, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginAuthInput: LoginAuthInput): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(loginAuthInput.username);

    if (!user) {
      throw new NotFoundException('This account is not exist');
    }

    const { password, isActive, boards, ...result } = user;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: this.jwtService.sign({ username: user.email, sub: user.id }),
    };
  }

  async signup(signupAuthInput: SignupAuthInput): Promise<any> {
    const user = await this.usersService.findByEmail(signupAuthInput.email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const createdUser = await this.usersService.create({
      ...signupAuthInput,
      password: EncryptionUtil.encrypt(signupAuthInput.password),
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      accessToken: this.jwtService.sign({ username: createdUser.email, sub: createdUser.id }),
    };
  }
}
