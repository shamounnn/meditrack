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
exports.MedicationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medication_entity_1 = require("./entities/medication.entity");
let MedicationsService = class MedicationsService {
    constructor(medsRepo) {
        this.medsRepo = medsRepo;
    }
    async create(input) {
        const entity = this.medsRepo.create({
            userId: input.userId,
            name: input.name,
            dosage: input.dosage,
            pillsPerBox: input.pillsPerBox,
            currentPills: input.currentPills,
            sideEffects: input.sideEffects,
            lowStockThreshold: input.lowStockThreshold ?? 5,
        });
        return this.medsRepo.save(entity);
    }
    async findAll() {
        return this.medsRepo.find({ relations: ['schedules'] });
    }
    async findOne(id) {
        const med = await this.medsRepo.findOne({ where: { id }, relations: ['schedules'] });
        if (!med) {
            throw new common_1.NotFoundException('Medication not found');
        }
        return med;
    }
    async findByUser(userId) {
        return this.medsRepo.find({ where: { userId }, relations: ['schedules'] });
    }
    async findLowStock(userId) {
        return this.medsRepo.find({
            where: {
                userId,
                currentPills: (0, typeorm_2.Raw)((alias) => `${alias} <= "low_stock_threshold"`),
            },
        });
    }
    async update(input) {
        const med = await this.findOne(input.id);
        if (input.quantityToDeduct) {
            if (!med.currentPills || med.currentPills - input.quantityToDeduct < 0) {
                throw new common_1.BadRequestException('Not enough pills');
            }
            med.currentPills -= input.quantityToDeduct;
        }
        Object.assign(med, {
            name: input.name ?? med.name,
            dosage: input.dosage ?? med.dosage,
            pillsPerBox: input.pillsPerBox ?? med.pillsPerBox,
            currentPills: input.currentPills ?? med.currentPills,
            sideEffects: input.sideEffects ?? med.sideEffects,
            lowStockThreshold: input.lowStockThreshold ?? med.lowStockThreshold,
        });
        return this.medsRepo.save(med);
    }
    async remove(id) {
        await this.medsRepo.delete(id);
    }
};
exports.MedicationsService = MedicationsService;
exports.MedicationsService = MedicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medication_entity_1.Medication)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MedicationsService);
//# sourceMappingURL=medications.service.js.map