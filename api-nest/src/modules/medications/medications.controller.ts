import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MedicationsService } from './medications.service';
import { CreateMedicationInput } from './dto/create-medication.input';
import { UpdateMedicationInput } from './dto/update-medication.input';
import { Medication } from './entities/medication.entity';

@ApiTags('medications')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all medications', description: 'Retrieve all medications in the system' })
  @ApiResponse({ status: 200, description: 'List of medications returned successfully' })
  async findAll(): Promise<Medication[]> {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medication by ID', description: 'Retrieve a specific medication by its ID' })
  @ApiParam({ name: 'id', description: 'Medication ID' })
  @ApiResponse({ status: 200, description: 'Medication found' })
  @ApiResponse({ status: 404, description: 'Medication not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Medication> {
    return this.medicationsService.findOne(id);
  }

  @Get('/user/:userId')
  async findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<Medication[]> {
    return this.medicationsService.findByUser(userId);
  }

  @Get('/user/:userId/low-stock')
  async findLowStock(@Param('userId', ParseIntPipe) userId: number): Promise<Medication[]> {
    return this.medicationsService.findLowStock(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create medication', description: 'Add a new medication to the system' })
  @ApiBody({ type: CreateMedicationInput })
  @ApiResponse({ status: 201, description: 'Medication created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() input: CreateMedicationInput): Promise<Medication> {
    return this.medicationsService.create(input);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: Omit<UpdateMedicationInput, 'id'>,
  ): Promise<Medication> {
    return this.medicationsService.update({ ...input, id });
  }

  @Post(':id/deduct')
  async deduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { quantity: number },
  ): Promise<Medication> {
    return this.medicationsService.update({ id, quantityToDeduct: body.quantity || 1 });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.medicationsService.remove(id);
  }
}
