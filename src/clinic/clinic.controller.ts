import { Controller, Get, Param } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import ClinicFull from "./interfaces/clinic.interface";

@Controller('clinic')
export class ClinicController {

  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  async getAllClinics(): Promise<ClinicFull[]> {
    return this.clinicService.getAllClinics();
  }

  @Get(':serviceId')
  async getClinicsByServiceId(@Param('serviceId') serviceId: string): Promise<ClinicFull[]> {
    return this.clinicService.getClinicsByServiceId(serviceId);
  }
}
