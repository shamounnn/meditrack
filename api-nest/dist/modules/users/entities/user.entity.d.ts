import { Medication } from '../../medications/entities/medication.entity';
import { InteractionAlert } from '../../alerts/entities/interaction-alert.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    faceDescriptor?: string;
    createdAt: Date;
    medications: Medication[];
    alerts: InteractionAlert[];
}
