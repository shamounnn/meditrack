import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesResolver } from './schedules.resolver';
import { MedicationSchedule } from './entities/medication-schedule.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationSchedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulesResolver, JwtAuthGuard],
  exports: [SchedulesService],
})
export class SchedulesModule {}
