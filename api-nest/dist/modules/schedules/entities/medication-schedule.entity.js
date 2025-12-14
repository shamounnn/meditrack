"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationSchedule = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const medication_entity_1 = require("../../medications/entities/medication.entity");
let MedicationSchedule = class MedicationSchedule {
};
exports.MedicationSchedule = MedicationSchedule;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'schedule_id' }),
    __metadata("design:type", Number)
], MedicationSchedule.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'medication_id' }),
    __metadata("design:type", Number)
], MedicationSchedule.prototype, "medicationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medication_entity_1.Medication, (medication) => medication.schedules, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medication_id' }),
    __metadata("design:type", medication_entity_1.Medication)
], MedicationSchedule.prototype, "medication", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'intake_time', nullable: true, type: 'time' }),
    __metadata("design:type", String)
], MedicationSchedule.prototype, "intakeTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MedicationSchedule.prototype, "frequency", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'dose_quantity', nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], MedicationSchedule.prototype, "doseQuantity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], MedicationSchedule.prototype, "createdAt", void 0);
exports.MedicationSchedule = MedicationSchedule = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'medication_schedules' })
], MedicationSchedule);
//# sourceMappingURL=medication-schedule.entity.js.map