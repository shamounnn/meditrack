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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const medications_service_1 = require("./medications.service");
const medication_entity_1 = require("./entities/medication.entity");
const create_medication_input_1 = require("./dto/create-medication.input");
const update_medication_input_1 = require("./dto/update-medication.input");
let MedicationsResolver = class MedicationsResolver {
    constructor(medicationsService) {
        this.medicationsService = medicationsService;
    }
    async medications() {
        return this.medicationsService.findAll();
    }
    async medication(id) {
        return this.medicationsService.findOne(id);
    }
    async medicationsByUser(userId) {
        return this.medicationsService.findByUser(userId);
    }
    async createMedication(input) {
        return this.medicationsService.create(input);
    }
    async updateMedication(input) {
        return this.medicationsService.update(input);
    }
};
exports.MedicationsResolver = MedicationsResolver;
__decorate([
    (0, graphql_1.Query)(() => [medication_entity_1.Medication]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicationsResolver.prototype, "medications", null);
__decorate([
    (0, graphql_1.Query)(() => medication_entity_1.Medication),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsResolver.prototype, "medication", null);
__decorate([
    (0, graphql_1.Query)(() => [medication_entity_1.Medication]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsResolver.prototype, "medicationsByUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => medication_entity_1.Medication),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medication_input_1.CreateMedicationInput]),
    __metadata("design:returntype", Promise)
], MedicationsResolver.prototype, "createMedication", null);
__decorate([
    (0, graphql_1.Mutation)(() => medication_entity_1.Medication),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_medication_input_1.UpdateMedicationInput]),
    __metadata("design:returntype", Promise)
], MedicationsResolver.prototype, "updateMedication", null);
exports.MedicationsResolver = MedicationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => medication_entity_1.Medication),
    __metadata("design:paramtypes", [medications_service_1.MedicationsService])
], MedicationsResolver);
//# sourceMappingURL=medications.resolver.js.map