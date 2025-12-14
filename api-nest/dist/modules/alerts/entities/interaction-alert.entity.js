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
exports.InteractionAlert = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const medication_entity_1 = require("../../medications/entities/medication.entity");
let InteractionAlert = class InteractionAlert {
};
exports.InteractionAlert = InteractionAlert;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'alert_id' }),
    __metadata("design:type", Number)
], InteractionAlert.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], InteractionAlert.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.alerts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], InteractionAlert.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'medication1_id' }),
    __metadata("design:type", Number)
], InteractionAlert.prototype, "medication1Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medication_entity_1.Medication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medication1_id' }),
    __metadata("design:type", medication_entity_1.Medication)
], InteractionAlert.prototype, "medication1", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'medication2_id' }),
    __metadata("design:type", Number)
], InteractionAlert.prototype, "medication2Id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medication_entity_1.Medication, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'medication2_id' }),
    __metadata("design:type", medication_entity_1.Medication)
], InteractionAlert.prototype, "medication2", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ name: 'alert_message', type: 'text' }),
    __metadata("design:type", String)
], InteractionAlert.prototype, "alertMessage", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InteractionAlert.prototype, "severity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], InteractionAlert.prototype, "createdAt", void 0);
exports.InteractionAlert = InteractionAlert = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'interaction_alerts' })
], InteractionAlert);
//# sourceMappingURL=interaction-alert.entity.js.map