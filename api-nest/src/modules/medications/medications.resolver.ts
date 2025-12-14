import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicationsService } from './medications.service';
import { Medication } from './entities/medication.entity';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';

@Resolver(() => Medication)
export class MedicationsResolver {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Query(() => [Medication])
  async medications(): Promise<Medication[]> {
    return this.medicationsService.findAll();
  }

  @Query(() => Medication)
  async medication(@Args('id', { type: () => Int }) id: number): Promise<Medication> {
    return this.medicationsService.findOne(id);
  }

  @Query(() => [Medication])
  async medicationsByUser(@Args('userId', { type: () => Int }) userId: number): Promise<Medication[]> {
    return this.medicationsService.findByUser(userId);
  }

  @Mutation(() => Medication)
  async createMedication(@Args('input') input: CreateMedicationInput): Promise<Medication> {
    return this.medicationsService.create(input);
  }

  @Mutation(() => Medication)
  async updateMedication(@Args('input') input: UpdateMedicationInput): Promise<Medication> {
    return this.medicationsService.update(input);
  }
}
