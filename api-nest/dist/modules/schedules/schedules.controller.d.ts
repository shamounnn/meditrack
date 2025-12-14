import { SchedulesService } from './schedules.service';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
import { MedicationSchedule } from './entities/medication-schedule.entity';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    findAll(): Promise<MedicationSchedule[]>;
    findOne(id: number): Promise<MedicationSchedule>;
    findByMedication(medicationId: number): Promise<MedicationSchedule[]>;
    findByUser(userId: number): Promise<MedicationSchedule[]>;
    create(input: CreateScheduleInput): Promise<MedicationSchedule>;
    update(id: number, input: Omit<UpdateScheduleInput, 'id'>): Promise<MedicationSchedule>;
    remove(id: number): Promise<void>;
}
