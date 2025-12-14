import { Repository } from 'typeorm';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
export declare class AlertsService {
    private readonly alertsRepo;
    constructor(alertsRepo: Repository<InteractionAlert>);
    create(input: CreateAlertInput): Promise<InteractionAlert>;
    findAll(): Promise<InteractionAlert[]>;
    findOne(id: number): Promise<InteractionAlert>;
    findByUser(userId: number): Promise<InteractionAlert[]>;
    update(input: UpdateAlertInput): Promise<InteractionAlert>;
    remove(id: number): Promise<void>;
}
