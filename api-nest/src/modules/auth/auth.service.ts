import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { LoginInput } from './dto/login.input';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserInput } from '../users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      return UserDto.fromEntity(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginInput: LoginInput): Promise<{ accessToken: string; user: UserDto }> {
    const user = await this.validateUser(loginInput.username, loginInput.password);
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  async register(input: CreateUserInput): Promise<{ accessToken: string; user: UserDto }> {
    const user = await this.usersService.create(input);
    const payload: JwtPayload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }
}
