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
exports.MedicationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const medications_service_1 = require("./medications.service");
const create_medication_input_1 = require("./dto/create-medication.input");
let MedicationsController = class MedicationsController {
    constructor(medicationsService) {
        this.medicationsService = medicationsService;
    }
    async findAll() {
        return this.medicationsService.findAll();
    }
    async findOne(id) {
        return this.medicationsService.findOne(id);
    }
    async findByUser(userId) {
        return this.medicationsService.findByUser(userId);
    }
    async findLowStock(userId) {
        return this.medicationsService.findLowStock(userId);
    }
    async create(input) {
        return this.medicationsService.create(input);
    }
    async update(id, input) {
        return this.medicationsService.update({ ...input, id });
    }
    async deduct(id, body) {
        return this.medicationsService.update({ id, quantityToDeduct: body.quantity || 1 });
    }
    async remove(id) {
        return this.medicationsService.remove(id);
    }
};
exports.MedicationsController = MedicationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all medications', description: 'Retrieve all medications in the system' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of medications returned successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get medication by ID', description: 'Retrieve a specific medication by its ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Medication ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medication found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Medication not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('/user/:userId/low-stock'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "findLowStock", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create medication', description: 'Add a new medication to the system' }),
    (0, swagger_1.ApiBody)({ type: create_medication_input_1.CreateMedicationInput }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Medication created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medication_input_1.CreateMedicationInput]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/deduct'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "deduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicationsController.prototype, "remove", null);
exports.MedicationsController = MedicationsController = __decorate([
    (0, swagger_1.ApiTags)('medications'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('medications'),
    __metadata("design:paramtypes", [medications_service_1.MedicationsService])
], MedicationsController);
//# sourceMappingURL=medications.controller.js.map