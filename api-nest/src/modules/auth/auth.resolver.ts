import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async loginUser(@Args('input') input: LoginInput): Promise<string> {
    const { accessToken } = await this.authService.login(input);
    return accessToken;
  }

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput): Promise<User> {
    const { user } = await this.authService.register(input);
    return user as unknown as User;
  }
}
