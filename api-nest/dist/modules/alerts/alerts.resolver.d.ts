import { AlertsService } from './alerts.service';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';
export declare class AlertsResolver {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    alerts(): Promise<InteractionAlert[]>;
    alertsByUser(userId: number): Promise<InteractionAlert[]>;
    createAlert(input: CreateAlertInput): Promise<InteractionAlert>;
    updateAlert(input: UpdateAlertInput): Promise<InteractionAlert>;
}
