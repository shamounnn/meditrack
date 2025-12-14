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
exports.AlertsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const alerts_service_1 = require("./alerts.service");
const interaction_alert_entity_1 = require("./entities/interaction-alert.entity");
const create_alert_input_1 = require("./dto/create-alert.input");
const update_alert_input_1 = require("./dto/update-alert.input");
let AlertsResolver = class AlertsResolver {
    constructor(alertsService) {
        this.alertsService = alertsService;
    }
    async alerts() {
        return this.alertsService.findAll();
    }
    async alertsByUser(userId) {
        return this.alertsService.findByUser(userId);
    }
    async createAlert(input) {
        return this.alertsService.create(input);
    }
    async updateAlert(input) {
        return this.alertsService.update(input);
    }
};
exports.AlertsResolver = AlertsResolver;
__decorate([
    (0, graphql_1.Query)(() => [interaction_alert_entity_1.InteractionAlert]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsResolver.prototype, "alerts", null);
__decorate([
    (0, graphql_1.Query)(() => [interaction_alert_entity_1.InteractionAlert]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlertsResolver.prototype, "alertsByUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => interaction_alert_entity_1.InteractionAlert),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alert_input_1.CreateAlertInput]),
    __metadata("design:returntype", Promise)
], AlertsResolver.prototype, "createAlert", null);
__decorate([
    (0, graphql_1.Mutation)(() => interaction_alert_entity_1.InteractionAlert),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_alert_input_1.UpdateAlertInput]),
    __metadata("design:returntype", Promise)
], AlertsResolver.prototype, "updateAlert", null);
exports.AlertsResolver = AlertsResolver = __decorate([
    (0, graphql_1.Resolver)(() => interaction_alert_entity_1.InteractionAlert),
    __metadata("design:paramtypes", [alerts_service_1.AlertsService])
], AlertsResolver);
//# sourceMappingURL=alerts.resolver.js.map