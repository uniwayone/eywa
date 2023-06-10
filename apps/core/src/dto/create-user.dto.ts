import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { lowercaseString, sanitizeInput } from '../helpers/utils.helper';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  last_name: string;

  @IsString()
  @MinLength(4)
  @Transform(({ value }) => lowercaseString(value))
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email address.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password requires at least one uppercase letter, one lowercase letter, and one number or special character.',
  })
  @MinLength(8, {
    message: 'Password must be eight characters or longer.',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  role: string;

  @IsString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  address: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  country: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  phone_mumber: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
