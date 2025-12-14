import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '../users/dto/create-user.input';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return JWT token' })
  @ApiBody({ type: LoginInput })
  @ApiResponse({ status: 200, description: 'Login successful, returns user and access token' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() input: LoginInput) {
    return this.authService.login(input);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration', description: 'Register a new user account' })
  @ApiBody({ type: CreateUserInput })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'User already exists or validation error' })
  async register(@Body() input: CreateUserInput) {
    return this.authService.register(input);
  }
}
