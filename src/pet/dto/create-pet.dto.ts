import { IsNotEmpty, IsString, IsNumber, MinLength, MaxLength, IsPositive } from "class-validator";
import { OrderDto } from "./oder-pet.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePetDto {
  @ApiProperty({
    example: 'Johnny',
    description: 'The name of the Pet',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly name: string;

  @ApiProperty({
    example: 5,
    description: 'The age of the Pet',
    format: 'number',
  })
  @IsNumber()
  @IsPositive()
  readonly age: string;

  @ApiProperty({
    example: 'Dog',
    description: 'The type of the Pet',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly type: string;

  @ApiProperty({
    example: 'dachshund',
    description: 'The breed of the Pet',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  readonly breed: string;

  @ApiProperty({
    example: [],
    description: 'The orders of the Pet',
    format: 'array',
  })
  orders: OrderDto[] = [];
}
