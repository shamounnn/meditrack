import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(input: CreateUserInput): Promise<User>;
    users(): Promise<User[]>;
    user(id: number): Promise<User>;
}
