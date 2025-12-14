import { MedicationsService } from './medications.service';
import { Medication } from './entities/medication.entity';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
export declare class MedicationsResolver {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    medications(): Promise<Medication[]>;
    medication(id: number): Promise<Medication>;
    medicationsByUser(userId: number): Promise<Medication[]>;
    createMedication(input: CreateMedicationInput): Promise<Medication>;
    updateMedication(input: UpdateMedicationInput): Promise<Medication>;
}
