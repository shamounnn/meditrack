import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(MedicationSchedule)
    private readonly schedulesRepo: Repository<MedicationSchedule>,
  ) {}

  async create(input: CreateScheduleInput): Promise<MedicationSchedule> {
    const entity = this.schedulesRepo.create({
      medicationId: input.medicationId,
      intakeTime: input.intakeTime,
      frequency: input.frequency,
      doseQuantity: input.doseQuantity,
    });
    return this.schedulesRepo.save(entity);
  }

  async findAll(): Promise<MedicationSchedule[]> {
    return this.schedulesRepo.find();
  }

  async findOne(id: number): Promise<MedicationSchedule> {
    const schedule = await this.schedulesRepo.findOne({ where: { id } });
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async findByMedication(medicationId: number): Promise<MedicationSchedule[]> {
    return this.schedulesRepo.find({ where: { medicationId } });
  }

  async findByUser(userId: number): Promise<MedicationSchedule[]> {
    return this.schedulesRepo.find({
      relations: ['medication'],
      where: {
        medication: { userId },
      },
    });
  }

  async update(input: UpdateScheduleInput): Promise<MedicationSchedule> {
    const schedule = await this.findOne(input.id);
    Object.assign(schedule, {
      intakeTime: input.intakeTime ?? schedule.intakeTime,
      frequency: input.frequency ?? schedule.frequency,
      doseQuantity: input.doseQuantity ?? schedule.doseQuantity,
    });
    return this.schedulesRepo.save(schedule);
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepo.delete(id);
  }
}
