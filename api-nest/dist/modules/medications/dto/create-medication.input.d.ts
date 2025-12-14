export declare class CreateMedicationInput {
    userId: number;
    name: string;
    dosage: string;
    pillsPerBox?: number;
    currentPills?: number;
    sideEffects?: string;
    lowStockThreshold?: number;
}
