import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateScheduleInput } from './create-schedule.input';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;
}
