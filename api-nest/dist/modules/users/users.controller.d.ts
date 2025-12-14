import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(input: CreateUserInput): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: number): Promise<UserDto>;
    updateFaceDescriptor(id: number, body: {
        faceDescriptor: string;
    }): Promise<{
        success: boolean;
    }>;
    verifyFace(body: {
        faceDescriptor: string;
    }): Promise<UserDto | null>;
}
