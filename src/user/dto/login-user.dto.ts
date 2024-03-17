import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty({
      example: 'pejman@gmail.com',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    @ApiProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
  }
