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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const medication_schedule_entity_1 = require("./entities/medication-schedule.entity");
let SchedulesService = class SchedulesService {
    constructor(schedulesRepo) {
        this.schedulesRepo = schedulesRepo;
    }
    async create(input) {
        const entity = this.schedulesRepo.create({
            medicationId: input.medicationId,
            intakeTime: input.intakeTime,
            frequency: input.frequency,
            doseQuantity: input.doseQuantity,
        });
        return this.schedulesRepo.save(entity);
    }
    async findAll() {
        return this.schedulesRepo.find();
    }
    async findOne(id) {
        const schedule = await this.schedulesRepo.findOne({ where: { id } });
        if (!schedule) {
            throw new common_1.NotFoundException('Schedule not found');
        }
        return schedule;
    }
    async findByMedication(medicationId) {
        return this.schedulesRepo.find({ where: { medicationId } });
    }
    async findByUser(userId) {
        return this.schedulesRepo.find({
            relations: ['medication'],
            where: {
                medication: { userId },
            },
        });
    }
    async update(input) {
        const schedule = await this.findOne(input.id);
        Object.assign(schedule, {
            intakeTime: input.intakeTime ?? schedule.intakeTime,
            frequency: input.frequency ?? schedule.frequency,
            doseQuantity: input.doseQuantity ?? schedule.doseQuantity,
        });
        return this.schedulesRepo.save(schedule);
    }
    async remove(id) {
        await this.schedulesRepo.delete(id);
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medication_schedule_entity_1.MedicationSchedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map