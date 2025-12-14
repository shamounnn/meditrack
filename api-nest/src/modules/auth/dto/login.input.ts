import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginInput {
  @Field()
  @ApiProperty({ example: 'john_doe', description: 'Username for login' })
  @IsNotEmpty()
  username!: string;

  @Field()
  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  password!: string;
}
