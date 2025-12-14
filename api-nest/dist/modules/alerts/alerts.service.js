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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const interaction_alert_entity_1 = require("./entities/interaction-alert.entity");
let AlertsService = class AlertsService {
    constructor(alertsRepo) {
        this.alertsRepo = alertsRepo;
    }
    async create(input) {
        const alert = this.alertsRepo.create({
            userId: input.userId,
            medication1Id: input.medication1Id,
            medication2Id: input.medication2Id,
            alertMessage: input.alertMessage,
            severity: input.severity,
        });
        return this.alertsRepo.save(alert);
    }
    async findAll() {
        return this.alertsRepo.find();
    }
    async findOne(id) {
        const alert = await this.alertsRepo.findOne({ where: { id } });
        if (!alert) {
            throw new common_1.NotFoundException('Alert not found');
        }
        return alert;
    }
    async findByUser(userId) {
        return this.alertsRepo.find({ where: { userId } });
    }
    async update(input) {
        const alert = await this.findOne(input.id);
        Object.assign(alert, {
            alertMessage: input.alertMessage ?? alert.alertMessage,
            severity: input.severity ?? alert.severity,
        });
        return this.alertsRepo.save(alert);
    }
    async remove(id) {
        await this.alertsRepo.delete(id);
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(interaction_alert_entity_1.InteractionAlert)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map