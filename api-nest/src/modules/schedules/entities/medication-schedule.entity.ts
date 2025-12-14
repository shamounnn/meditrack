import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Medication } from '../../medications/entities/medication.entity';

@ObjectType()
@Entity({ name: 'medication_schedules' })
export class MedicationSchedule {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ name: 'schedule_id' })
  id!: number;

  @Field(() => Int)
  @Column({ name: 'medication_id' })
  medicationId!: number;

  @ManyToOne(() => Medication, (medication) => medication.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medication_id' })
  medication!: Medication;

  @Field({ nullable: true })
  @Column({ name: 'intake_time', nullable: true, type: 'time' })
  intakeTime?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  frequency?: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'dose_quantity', nullable: true, type: 'int' })
  doseQuantity?: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
