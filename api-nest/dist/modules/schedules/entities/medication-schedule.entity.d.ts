import { Medication } from '../../medications/entities/medication.entity';
export declare class MedicationSchedule {
    id: number;
    medicationId: number;
    medication: Medication;
    intakeTime?: string;
    frequency?: string;
    doseQuantity?: number;
    createdAt: Date;
}
