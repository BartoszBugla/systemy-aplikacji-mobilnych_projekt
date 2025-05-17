import { ApiProperty } from '@nestjs/swagger';

export class TotalAmountResponse {
  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  currency: string;
}
