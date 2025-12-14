import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<UserDto> {
    const hash = await bcrypt.hash(input.password, 10);
    const entity = this.usersRepo.create({
      username: input.username,
      email: input.email,
      passwordHash: hash,
    });
    const saved = await this.usersRepo.save(entity);
    return UserDto.fromEntity(saved);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepo.find();
    return users.map(UserDto.fromEntity);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }

  async updateFaceDescriptor(id: number, faceDescriptor: string): Promise<void> {
    await this.usersRepo.update(id, { faceDescriptor });
  }

  async verifyFace(faceDescriptor: string): Promise<UserDto | null> {
    const users = await this.usersRepo.find({ where: { faceDescriptor: faceDescriptor } });
    return users.length > 0 ? UserDto.fromEntity(users[0]) : null;
  }
}
