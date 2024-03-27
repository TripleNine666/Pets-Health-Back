import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import ClinicFull from './interfaces/clinic.interface';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Clinic } from './schemas/clinic.schema';

@ApiTags('Clinic')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all clinics' })
  @ApiCreatedResponse({})
  async getAllClinics(): Promise<ClinicFull[]> {
    return this.clinicService.getAllClinics();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Get('service/:serviceId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get clinics by serviceId' })
  @ApiCreatedResponse({})
  async getClinicsByServiceId(
    @Param('serviceId') serviceId: string,
  ): Promise<ClinicFull[]> {
    return this.clinicService.getClinicsByServiceId(serviceId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all clinics' })
  @ApiCreatedResponse({})
  async getClinicById(@Param('id') id: string): Promise<ClinicFull> {
    return this.clinicService.getClinicById(id);
  }
}
