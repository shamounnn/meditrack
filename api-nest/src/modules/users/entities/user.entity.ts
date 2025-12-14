import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Medication } from '../../medications/entities/medication.entity';
import { InteractionAlert } from '../../alerts/entities/interaction-alert.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({ name: 'face_descriptor', type: 'text', nullable: true })
  faceDescriptor?: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => Medication, (medication) => medication.user)
  medications!: Medication[];

  @OneToMany(() => InteractionAlert, (alert) => alert.user)
  alerts!: InteractionAlert[];
}
