import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Medication } from '../../medications/entities/medication.entity';

@ObjectType()
@Entity({ name: 'interaction_alerts' })
export class InteractionAlert {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'alert_id' })
  id!: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.alerts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field(() => Int)
  @Column({ name: 'medication1_id' })
  medication1Id!: number;

  @ManyToOne(() => Medication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medication1_id' })
  medication1!: Medication;

  @Field(() => Int)
  @Column({ name: 'medication2_id' })
  medication2Id!: number;

  @ManyToOne(() => Medication, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medication2_id' })
  medication2!: Medication;

  @Field()
  @Column({ name: 'alert_message', type: 'text' })
  alertMessage!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  severity?: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
