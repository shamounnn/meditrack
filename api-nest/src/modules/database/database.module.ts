import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Medication } from '../medications/entities/medication.entity';
import { MedicationSchedule } from '../schedules/entities/medication-schedule.entity';
import { InteractionAlert } from '../alerts/entities/interaction-alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Medication, MedicationSchedule, InteractionAlert])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
