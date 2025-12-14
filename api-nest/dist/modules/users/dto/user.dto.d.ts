import { User } from '../entities/user.entity';
export declare class UserDto {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
    static fromEntity(user: User): UserDto;
}
