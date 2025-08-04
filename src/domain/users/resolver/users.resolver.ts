import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBaseResolver } from 'src/common/interfaces/base_resolver.interface';
import { CreateUsersInput } from '../dto/create_users.input';
import { UpdateUsersInput } from '../dto/update_users.input';
import { Users } from '../entity/users.entity';
import { UsersService } from '../service/users.service';

@Resolver(() => Users)
export class UsersResolver implements IBaseResolver<Users> {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => Users, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => Users, { name: 'user' })
  findByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => Users, { name: 'createUser' })
  create(
    @Args('createUsersInput', { type: () => CreateUsersInput }) data: CreateUsersInput
  ): Promise<any> {
    return this.usersService.create(data);
  }

  @Mutation(() => Users, { name: 'updateUser' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUsersInput', { type: () => UpdateUsersInput }) data: UpdateUsersInput
  ): Promise<any> {
    return this.usersService.update(id, data);
  }

  @Mutation(() => Users, { name: 'deleteUser' })
  delete(@Args('id', { type: () => Int }) id: number): Promise<any> {
    return this.usersService.delete(id);
  }
}
