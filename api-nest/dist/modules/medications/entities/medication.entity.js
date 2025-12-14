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
exports.Medication = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const medication_schedule_entity_1 = require("../../schedules/entities/medication-schedule.entity");
const interaction_alert_entity_1 = require("../../alerts/entities/interaction-alert.entity");
let Medication = class Medication {
};
exports.Medication = Medication;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'medication_id' }),
    __metadata("design:type", Number)
], Medication.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Medication.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.medications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Medication.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medication.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medication.prototype, "dosage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'pills_per_box', nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], Medication.prototype, "pillsPerBox", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ name: 'current_pills', nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], Medication.prototype, "currentPills", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ name: 'side_effects', nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Medication.prototype, "sideEffects", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'low_stock_threshold', default: 5, type: 'int' }),
    __metadata("design:type", Number)
], Medication.prototype, "lowStockThreshold", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Medication.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Medication.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => medication_schedule_entity_1.MedicationSchedule, (schedule) => schedule.medication),
    __metadata("design:type", Array)
], Medication.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interaction_alert_entity_1.InteractionAlert, (alert) => alert.medication1),
    __metadata("design:type", Array)
], Medication.prototype, "interactionAlerts", void 0);
exports.Medication = Medication = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'medications' })
], Medication);
//# sourceMappingURL=medication.entity.js.map