import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<UserDto>;
    login(loginInput: LoginInput): Promise<{
        accessToken: string;
        user: UserDto;
    }>;
    register(input: CreateUserInput): Promise<{
        accessToken: string;
        user: UserDto;
    }>;
}
