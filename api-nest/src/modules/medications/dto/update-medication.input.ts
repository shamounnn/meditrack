import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateMedicationInput } from './create-medication.input';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateMedicationInput extends PartialType(CreateMedicationInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  quantityToDeduct?: number;
}
