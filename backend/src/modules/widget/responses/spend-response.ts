import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { TransactionCurrency } from 'src/common/enums/transaction-currency.enum';

export class SpendResponse {
  @ApiProperty()
  @IsNumber()
  spend: number;

  @ApiProperty()
  @IsNumber()
  target: number;

  @ApiProperty({
    enumName: 'TransactionCurrency',
    enum: TransactionCurrency,
  })
  @IsEnum(TransactionCurrency)
  currency: TransactionCurrency;
}
