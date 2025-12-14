import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  async findAll(): Promise<MedicationSchedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MedicationSchedule> {
    return this.schedulesService.findOne(id);
  }

  @Get('/medication/:medicationId')
  async findByMedication(@Param('medicationId', ParseIntPipe) medicationId: number): Promise<MedicationSchedule[]> {
    return this.schedulesService.findByMedication(medicationId);
  }

  @Get('/user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<MedicationSchedule[]> {
    return this.schedulesService.findByUser(userId);
  }

  @Post()
  async create(@Body() input: CreateScheduleInput): Promise<MedicationSchedule> {
    return this.schedulesService.create(input);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdateScheduleInput, 'id'>,
  ): Promise<MedicationSchedule> {
    return this.schedulesService.update({ ...input, id });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.schedulesService.remove(id);
  }
}
