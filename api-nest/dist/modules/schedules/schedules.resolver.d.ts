import { SchedulesService } from './schedules.service';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';
export declare class SchedulesResolver {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    schedules(): Promise<MedicationSchedule[]>;
    schedulesByMedication(medicationId: number): Promise<MedicationSchedule[]>;
    schedulesByUser(userId: number): Promise<MedicationSchedule[]>;
    createSchedule(input: CreateScheduleInput): Promise<MedicationSchedule>;
    updateSchedule(input: UpdateScheduleInput): Promise<MedicationSchedule>;
}
