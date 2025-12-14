import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlertsService } from './alerts.service';
import { InteractionAlert } from './entities/interaction-alert.entity';
import { CreateAlertInput } from './dto/create-alert.input';
import { UpdateAlertInput } from './dto/update-alert.input';

@Resolver(() => InteractionAlert)
export class AlertsResolver {
  constructor(private readonly alertsService: AlertsService) {}

  @Query(() => [InteractionAlert])
  async alerts(): Promise<InteractionAlert[]> {
    return this.alertsService.findAll();
  }

  @Query(() => [InteractionAlert])
  async alertsByUser(@Args('userId', { type: () => Int }) userId: number): Promise<InteractionAlert[]> {
    return this.alertsService.findByUser(userId);
  }

  @Mutation(() => InteractionAlert)
  async createAlert(@Args('input') input: CreateAlertInput): Promise<InteractionAlert> {
    return this.alertsService.create(input);
  }

  @Mutation(() => InteractionAlert)
  async updateAlert(@Args('input') input: UpdateAlertInput): Promise<InteractionAlert> {
    return this.alertsService.update(input);
  }
}
