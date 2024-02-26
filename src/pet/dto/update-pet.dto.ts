
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePetProfileDto {

  @ApiProperty({
    example: 'Johnny',
    description: 'The name of the Pet',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly breed: string;
}