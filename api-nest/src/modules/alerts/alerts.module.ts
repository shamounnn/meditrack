import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { AlertsResolver } from './alerts.resolver';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([InteractionAlert])],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsResolver, JwtAuthGuard],
})
export class AlertsModule {}
