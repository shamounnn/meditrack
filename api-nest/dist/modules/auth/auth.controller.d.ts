import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(input: LoginInput): Promise<{
        accessToken: string;
        user: import("../users/dto/user.dto").UserDto;
    }>;
    register(input: CreateUserInput): Promise<{
        accessToken: string;
        user: import("../users/dto/user.dto").UserDto;
    }>;
}
