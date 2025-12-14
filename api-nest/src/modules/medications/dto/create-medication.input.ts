import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, MaxLength } from 'class-validator';

@InputType()
export class CreateMedicationInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  userId!: number;

  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  dosage!: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  pillsPerBox?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  currentPills?: number;

  @Field({ nullable: true })
  @IsOptional()
  sideEffects?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  lowStockThreshold?: number;
}
