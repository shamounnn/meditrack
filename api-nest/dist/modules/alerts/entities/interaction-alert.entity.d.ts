import { User } from '../../users/entities/user.entity';
import { Medication } from '../../medications/entities/medication.entity';
export declare class InteractionAlert {
    id: number;
    userId: number;
    user: User;
    medication1Id: number;
    medication1: Medication;
    medication2Id: number;
    medication2: Medication;
    alertMessage: string;
    severity?: string;
    createdAt: Date;
}
