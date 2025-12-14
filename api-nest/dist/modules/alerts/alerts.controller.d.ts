import { AlertsService } from './alerts.service';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
import { InteractionAlert } from './entities/interaction-alert.entity';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    findAll(): Promise<InteractionAlert[]>;
    findOne(id: number): Promise<InteractionAlert>;
    findByUser(userId: number): Promise<InteractionAlert[]>;
    create(input: CreateAlertInput): Promise<InteractionAlert>;
    update(id: number, input: Omit<UpdateAlertInput, 'id'>): Promise<InteractionAlert>;
    remove(id: number): Promise<void>;
}
