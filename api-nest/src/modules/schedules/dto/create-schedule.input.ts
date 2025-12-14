import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  medicationId!: number;

  @Field({ nullable: true })
  @IsOptional()
  intakeTime?: string;

  @Field({ nullable: true })
  @IsOptional()
  frequency?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  doseQuantity?: number;
}
