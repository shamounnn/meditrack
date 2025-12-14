import { User } from '../entities/user.entity';

export class UserDto {
  id!: number;
  username!: string;
  email!: string;
  createdAt!: Date;

  static fromEntity(user: User): UserDto {
    const dto = new UserDto();
    dto.id = user.id;
    dto.username = user.username;
    dto.email = user.email;
    dto.createdAt = user.createdAt;
    return dto;
  }
}
