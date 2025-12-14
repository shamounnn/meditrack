import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput): Promise<User> {
    const dto = await this.usersService.create(input);
    return { ...dto } as User;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users as unknown as User[];
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const userEntity = await this.usersService.findOne(id);
    return userEntity;
  }
}
