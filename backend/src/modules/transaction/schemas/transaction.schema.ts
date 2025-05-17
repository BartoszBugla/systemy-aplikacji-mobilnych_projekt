import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TransactionCurrency } from 'src/common/enums/transaction-currency.enum';

import { User } from 'src/modules/user/schemas/user.schema';

export type TransactionDocument = Transaction & mongoose.Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Transaction {
  @Prop({ type: Number, required: true, min: [0, 'Amount must be positive'] })
  amount: number;

  @Prop({ type: String, enum: TransactionCurrency, required: [true] })
  currency: TransactionCurrency;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  category?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
  })
  accountReceiver: User | mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true] })
  accountSender: User | mongoose.Types.ObjectId;

  createdAt?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
