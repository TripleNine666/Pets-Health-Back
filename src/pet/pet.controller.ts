import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreatePetDto } from "./dto/create-pet.dto";
import { PetService } from "./pet.service";
import { UpdatePetProfileDto } from "./dto/update-pet.dto";
import { OrderDto } from "./dto/oder-pet.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petsService: PetService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Create pet'})
  @ApiCreatedResponse({})
  create(@Body() createPetDto: CreatePetDto, @Req() req) {
    const userId = req.user.userId; // Получение userId из токена
    return this.petsService.create(createPetDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Pets'})
  @ApiOkResponse({})
  findAll(@Req() req) {
    const userId = req.user.userId; // Получение userId из токена
    return this.petsService.findAllByUserId(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({summary: 'Pet'})
  @ApiOkResponse({})
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/profile')
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update pet'})
  @ApiOkResponse({})
  async updatePetProfile(@Param('id') id: string, @Body() updatePetProfileDto: UpdatePetProfileDto) {
    return this.petsService.updatePetProfile(id, updatePetProfileDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/orders')
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Add order'})
  @ApiOkResponse({})
  async addOrderToPet(@Param('id') id: string, @Body() orderDto: OrderDto) {
    return this.petsService.addOrderToPet(id, orderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Delete pet'})
  @ApiOkResponse({})
  remove(@Param('id') id: string) {
    return this.petsService.delete(id);
  }
}
