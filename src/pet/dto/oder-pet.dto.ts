import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";

export class OrderDto {
  @ApiProperty({
    description: 'Date',
    format: 'Date',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  date: Date;

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

  @ApiProperty({
    example: '1',
    description: 'The clinic id',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  clinicId: string;
}


