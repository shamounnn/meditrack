import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MedicationSchedule } from '../../schedules/entities/medication-schedule.entity';
import { InteractionAlert } from '../../alerts/entities/interaction-alert.entity';

@ObjectType()
@Entity({ name: 'medications' })
export class Medication {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'medication_id' })
  id!: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.medications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  dosage!: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'pills_per_box', nullable: true, type: 'int' })
  pillsPerBox?: number;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'current_pills', nullable: true, type: 'int' })
  currentPills?: number;

  @Field({ nullable: true })
  @Column({ name: 'side_effects', nullable: true, type: 'text' })
  sideEffects?: string;

  @Field(() => Int)
  @Column({ name: 'low_stock_threshold', default: 5, type: 'int' })
  lowStockThreshold!: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => MedicationSchedule, (schedule) => schedule.medication)
  schedules!: MedicationSchedule[];

  @OneToMany(() => InteractionAlert, (alert) => alert.medication1)
  interactionAlerts!: InteractionAlert[];
}
