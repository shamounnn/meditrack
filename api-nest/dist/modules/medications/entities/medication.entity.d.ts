import { User } from '../../users/entities/user.entity';
import { MedicationSchedule } from '../../schedules/entities/medication-schedule.entity';
import { InteractionAlert } from '../../alerts/entities/interaction-alert.entity';
export declare class Medication {
    id: number;
    userId: number;
    user: User;
    name: string;
    dosage: string;
    pillsPerBox?: number;
    currentPills?: number;
    sideEffects?: string;
    lowStockThreshold: number;
    createdAt: Date;
    updatedAt: Date;
    schedules: MedicationSchedule[];
    interactionAlerts: InteractionAlert[];
}
