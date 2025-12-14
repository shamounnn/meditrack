import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  async findAll(): Promise<InteractionAlert[]> {
    return this.alertsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<InteractionAlert> {
    return this.alertsService.findOne(id);
  }

  @Get('/user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<InteractionAlert[]> {
    return this.alertsService.findByUser(userId);
  }

  @Post()
  async create(@Body() input: CreateAlertInput): Promise<InteractionAlert> {
    return this.alertsService.create(input);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdateAlertInput, 'id'>,
  ): Promise<InteractionAlert> {
    return this.alertsService.update({ ...input, id });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.alertsService.remove(id);
  }
}
