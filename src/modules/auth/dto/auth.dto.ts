import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsE164PhoneNumber} from "@common/decorators/is-phone-number";

export class AuthRequestDto {
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({
    description: 'Insert account email.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Insert account password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class RegisterUserDto {
  @ApiProperty({
    description: 'Insert your first name.',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Insert your last name.',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Insert email. Ex: peterwillson@gmail.com.',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Insert phone number. Ex: +16175551212 .',
  })
  @IsOptional()
  @IsE164PhoneNumber()
  phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    description: 'Insert password.',
  })
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
