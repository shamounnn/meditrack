import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAlertInput } from './create-alert.input';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateAlertInput extends PartialType(CreateAlertInput) {
  @Field(() => Int)
  @IsInt()
  id!: number;
}
