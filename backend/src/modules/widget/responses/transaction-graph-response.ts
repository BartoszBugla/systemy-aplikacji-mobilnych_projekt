import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

export class TransactionGraphItem {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  type: TransactionType;
}

export class TransactionGraphResponse {
  @ApiProperty({ type: [TransactionGraphItem] })
  data: TransactionGraphItem[];
}
