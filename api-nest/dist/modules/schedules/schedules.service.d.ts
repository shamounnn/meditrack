import { Repository } from 'typeorm';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
export declare class SchedulesService {
    private readonly schedulesRepo;
    constructor(schedulesRepo: Repository<MedicationSchedule>);
    create(input: CreateScheduleInput): Promise<MedicationSchedule>;
    findAll(): Promise<MedicationSchedule[]>;
    findOne(id: number): Promise<MedicationSchedule>;
    findByMedication(medicationId: number): Promise<MedicationSchedule[]>;
    findByUser(userId: number): Promise<MedicationSchedule[]>;
    update(input: UpdateScheduleInput): Promise<MedicationSchedule>;
    remove(id: number): Promise<void>;
}
