import { CreateMedicationInput } from './create-medication.input';
declare const UpdateMedicationInput_base: import("@nestjs/common").Type<Partial<CreateMedicationInput>>;
export declare class UpdateMedicationInput extends UpdateMedicationInput_base {
    id: number;
    quantityToDeduct?: number;
}
export {};
