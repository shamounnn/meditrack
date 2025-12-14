import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { MedicationsResolver } from './medications.resolver';
import { Medication } from './entities/medication.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  controllers: [MedicationsController],
  providers: [MedicationsService, MedicationsResolver, JwtAuthGuard],
  exports: [MedicationsService],
})
export class MedicationsModule {}
