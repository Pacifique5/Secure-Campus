import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(['ADMIN', 'STUDENT', 'STAFF'])
  @IsOptional()
  role?: 'ADMIN' | 'STUDENT' | 'STAFF';
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
