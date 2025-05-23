import { ApiProperty } from '@nestjs/swagger';

import { TransactionDocument } from '../schemas/transaction.schema';
import { TransactionType } from 'src/common/enums/transaction-type.enum';
import { TransactionCategory } from 'src/common/enums/transaction-category.enum';
import { TransactionCurrency } from 'src/common/enums/transaction-currency.enum';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

export class TransactionResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty({
    enum: TransactionCurrency,
    enumName: 'TransactionCurrency',
  })
  currency: TransactionCurrency;
  @ApiProperty()
  type: TransactionType;
  @ApiProperty()
  description: string;
  @ApiProperty()
  category: TransactionCategory;
  @ApiProperty()
  accountReceiver: string;
  @ApiProperty()
  accountSender: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  secondAccountEmail: string;

  @ApiProperty()
  __v: number;

  static mapFromDoc(item: TransactionDocument): TransactionResponse {
    return {
      ...item.toObject(),
      secondAccountEmail:
        item.secondUserEmail || (item.accountReceiver as UserDocument).email,
    } as TransactionResponse;
  }
}
