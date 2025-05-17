import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional()
  @IsBoolean()
  seen: boolean;
}
