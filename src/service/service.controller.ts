import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Login User'})
  @ApiOkResponse({})
  async getAllServices() {
    return this.servicesService.findAll();
  }
}
