import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() input: CreateUserInput): Promise<UserDto> {
    return this.usersService.create(input);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return UserDto.fromEntity(await this.usersService.findOne(id));
  }

  @Put(':id/face-descriptor')
  async updateFaceDescriptor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { faceDescriptor: string },
  ): Promise<{ success: boolean }> {
    await this.usersService.updateFaceDescriptor(id, body.faceDescriptor);
    return { success: true };
  }

  @Post('verify-face')
  async verifyFace(@Body() body: { faceDescriptor: string }): Promise<UserDto | null> {
    return this.usersService.verifyFace(body.faceDescriptor);
  }
}
