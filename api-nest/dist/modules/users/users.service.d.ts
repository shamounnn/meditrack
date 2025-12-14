import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    create(input: CreateUserInput): Promise<UserDto>;
    findAll(): Promise<UserDto[]>;
    findOne(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    remove(id: number): Promise<void>;
    updateFaceDescriptor(id: number, faceDescriptor: string): Promise<void>;
    verifyFace(faceDescriptor: string): Promise<UserDto | null>;
}
