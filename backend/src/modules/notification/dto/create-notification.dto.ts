import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  message: string | null;

  @ApiProperty()
  @IsBoolean()
  seen: boolean;

  @ApiProperty()
  @IsString()
  userId: string;
}
