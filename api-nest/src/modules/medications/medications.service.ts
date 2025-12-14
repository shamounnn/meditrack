import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private readonly medsRepo: Repository<Medication>,
  ) {}

  async create(input: CreateMedicationInput): Promise<Medication> {
    const entity = this.medsRepo.create({
      userId: input.userId,
      name: input.name,
      dosage: input.dosage,
      pillsPerBox: input.pillsPerBox,
      currentPills: input.currentPills,
      sideEffects: input.sideEffects,
      lowStockThreshold: input.lowStockThreshold ?? 5,
    });
    return this.medsRepo.save(entity);
  }

  async findAll(): Promise<Medication[]> {
    return this.medsRepo.find({ relations: ['schedules'] });
  }

  async findOne(id: number): Promise<Medication> {
    const med = await this.medsRepo.findOne({ where: { id }, relations: ['schedules'] });
    if (!med) {
      throw new NotFoundException('Medication not found');
    }
    return med;
  }

  async findByUser(userId: number): Promise<Medication[]> {
    return this.medsRepo.find({ where: { userId }, relations: ['schedules'] });
  }

  async findLowStock(userId: number): Promise<Medication[]> {
    return this.medsRepo.find({
      where: {
        userId,
        currentPills: Raw((alias) => `${alias} <= "low_stock_threshold"`),
      },
    });
  }

  async update(input: UpdateMedicationInput): Promise<Medication> {
    const med = await this.findOne(input.id);
    if (input.quantityToDeduct) {
      if (!med.currentPills || med.currentPills - input.quantityToDeduct < 0) {
        throw new BadRequestException('Not enough pills');
      }
      med.currentPills -= input.quantityToDeduct;
    }

    Object.assign(med, {
      name: input.name ?? med.name,
      dosage: input.dosage ?? med.dosage,
      pillsPerBox: input.pillsPerBox ?? med.pillsPerBox,
      currentPills: input.currentPills ?? med.currentPills,
      sideEffects: input.sideEffects ?? med.sideEffects,
      lowStockThreshold: input.lowStockThreshold ?? med.lowStockThreshold,
    });
    return this.medsRepo.save(med);
  }

  async remove(id: number): Promise<void> {
    await this.medsRepo.delete(id);
  }
}
