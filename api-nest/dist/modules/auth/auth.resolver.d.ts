import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(input: LoginInput): Promise<string>;
    registerUser(input: CreateUserInput): Promise<User>;
}
