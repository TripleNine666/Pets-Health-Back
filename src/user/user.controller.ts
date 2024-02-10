import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
  // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Register user'})
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

}
