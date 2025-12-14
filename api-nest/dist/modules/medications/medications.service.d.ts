import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
export declare class MedicationsService {
    private readonly medsRepo;
    constructor(medsRepo: Repository<Medication>);
    create(input: CreateMedicationInput): Promise<Medication>;
    findAll(): Promise<Medication[]>;
    findOne(id: number): Promise<Medication>;
    findByUser(userId: number): Promise<Medication[]>;
    findLowStock(userId: number): Promise<Medication[]>;
    update(input: UpdateMedicationInput): Promise<Medication>;
    remove(id: number): Promise<void>;
}
