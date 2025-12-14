import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateAlertInput {
  @Field(() => Int)
  @IsInt()
  userId!: number;

  @Field(() => Int)
  @IsInt()
  medication1Id!: number;

  @Field(() => Int)
  @IsInt()
  medication2Id!: number;

  @Field()
  @IsNotEmpty()
  alertMessage!: string;

  @Field({ nullable: true })
  @IsOptional()
  severity?: string;
}
