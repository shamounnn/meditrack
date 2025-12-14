import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(InteractionAlert)
    private readonly alertsRepo: Repository<InteractionAlert>,
  ) {}

  async create(input: CreateAlertInput): Promise<InteractionAlert> {
    const alert = this.alertsRepo.create({
      userId: input.userId,
      medication1Id: input.medication1Id,
      medication2Id: input.medication2Id,
      alertMessage: input.alertMessage,
      severity: input.severity,
    });
    return this.alertsRepo.save(alert);
  }

  async findAll(): Promise<InteractionAlert[]> {
    return this.alertsRepo.find();
  }

  async findOne(id: number): Promise<InteractionAlert> {
    const alert = await this.alertsRepo.findOne({ where: { id } });
    if (!alert) {
      throw new NotFoundException('Alert not found');
    }
    return alert;
  }

  async findByUser(userId: number): Promise<InteractionAlert[]> {
    return this.alertsRepo.find({ where: { userId } });
  }

  async update(input: UpdateAlertInput): Promise<InteractionAlert> {
    const alert = await this.findOne(input.id);
    Object.assign(alert, {
      alertMessage: input.alertMessage ?? alert.alertMessage,
      severity: input.severity ?? alert.severity,
    });
    return this.alertsRepo.save(alert);
  }

  async remove(id: number): Promise<void> {
    await this.alertsRepo.delete(id);
  }
}
