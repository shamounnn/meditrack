import { MedicationsService } from './medications.service';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
import { Medication } from './entities/medication.entity';
export declare class MedicationsController {
    private readonly medicationsService;
    constructor(medicationsService: MedicationsService);
    findAll(): Promise<Medication[]>;
    findOne(id: number): Promise<Medication>;
    findByUser(userId: number): Promise<Medication[]>;
    findLowStock(userId: number): Promise<Medication[]>;
    create(input: CreateMedicationInput): Promise<Medication>;
    update(id: number, input: Omit<UpdateMedicationInput, 'id'>): Promise<Medication>;
    deduct(id: number, body: {
        quantity: number;
    }): Promise<Medication>;
    remove(id: number): Promise<void>;
}
