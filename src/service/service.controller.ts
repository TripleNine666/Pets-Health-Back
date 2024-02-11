import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller('service')
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Login User'})
  @ApiOkResponse({})
  async getAllServices() {
    return this.servicesService.findAll();
  }
}
