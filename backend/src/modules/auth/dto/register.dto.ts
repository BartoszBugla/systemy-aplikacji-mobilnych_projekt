import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @ApiPropertyOptional()
  lastName?: string;
}
