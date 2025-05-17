import { ApiProperty } from '@nestjs/swagger';

import { TransactionResponse } from './transaction.response';

import { TransactionDocument } from '../schemas/transaction.schema';

export class TransactionListResponse {
  @ApiProperty({ type: [TransactionResponse] })
  data: TransactionResponse[];

  static mapFromDoc(items: TransactionDocument[]): TransactionListResponse {
    return {
      data: items.map((item) => TransactionResponse.mapFromDoc(item)),
    };
  }
}
