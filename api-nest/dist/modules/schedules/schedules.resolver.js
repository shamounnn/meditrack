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
exports.SchedulesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const schedules_service_1 = require("./schedules.service");
const medication_schedule_entity_1 = require("./entities/medication-schedule.entity");
const create_schedule_input_1 = require("./dto/create-schedule.input");
const update_schedule_input_1 = require("./dto/update-schedule.input");
let SchedulesResolver = class SchedulesResolver {
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    async schedules() {
        return this.schedulesService.findAll();
    }
    async schedulesByMedication(medicationId) {
        return this.schedulesService.findByMedication(medicationId);
    }
    async schedulesByUser(userId) {
        return this.schedulesService.findByUser(userId);
    }
    async createSchedule(input) {
        return this.schedulesService.create(input);
    }
    async updateSchedule(input) {
        return this.schedulesService.update(input);
    }
};
exports.SchedulesResolver = SchedulesResolver;
__decorate([
    (0, graphql_1.Query)(() => [medication_schedule_entity_1.MedicationSchedule]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulesResolver.prototype, "schedules", null);
__decorate([
    (0, graphql_1.Query)(() => [medication_schedule_entity_1.MedicationSchedule]),
    __param(0, (0, graphql_1.Args)('medicationId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchedulesResolver.prototype, "schedulesByMedication", null);
__decorate([
    (0, graphql_1.Query)(() => [medication_schedule_entity_1.MedicationSchedule]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SchedulesResolver.prototype, "schedulesByUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => medication_schedule_entity_1.MedicationSchedule),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_input_1.CreateScheduleInput]),
    __metadata("design:returntype", Promise)
], SchedulesResolver.prototype, "createSchedule", null);
__decorate([
    (0, graphql_1.Mutation)(() => medication_schedule_entity_1.MedicationSchedule),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_schedule_input_1.UpdateScheduleInput]),
    __metadata("design:returntype", Promise)
], SchedulesResolver.prototype, "updateSchedule", null);
exports.SchedulesResolver = SchedulesResolver = __decorate([
    (0, graphql_1.Resolver)(() => medication_schedule_entity_1.MedicationSchedule),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesResolver);
//# sourceMappingURL=schedules.resolver.js.map