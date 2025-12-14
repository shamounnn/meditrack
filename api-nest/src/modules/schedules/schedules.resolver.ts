import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SchedulesService } from './schedules.service';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { CreateScheduleInput } from './dto/create-schedule.input';
import { UpdateScheduleInput } from './dto/update-schedule.input';

@Resolver(() => MedicationSchedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Query(() => [MedicationSchedule])
  async schedules(): Promise<MedicationSchedule[]> {
    return this.schedulesService.findAll();
  }

  @Query(() => [MedicationSchedule])
  async schedulesByMedication(@Args('medicationId', { type: () => Int }) medicationId: number) {
    return this.schedulesService.findByMedication(medicationId);
  }

  @Query(() => [MedicationSchedule])
  async schedulesByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.schedulesService.findByUser(userId);
  }

  @Mutation(() => MedicationSchedule)
  async createSchedule(@Args('input') input: CreateScheduleInput): Promise<MedicationSchedule> {
    return this.schedulesService.create(input);
  }

  @Mutation(() => MedicationSchedule)
  async updateSchedule(@Args('input') input: UpdateScheduleInput): Promise<MedicationSchedule> {
    return this.schedulesService.update(input);
  }
}
