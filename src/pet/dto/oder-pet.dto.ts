import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
  @ApiProperty({
    description: 'Date',
    format: 'string',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: 'Прием',
    description: 'The title of the Order',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Первичный прием',
    description: 'The name of the Order',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 20,
    description: 'The cost of the Order',
    format: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

