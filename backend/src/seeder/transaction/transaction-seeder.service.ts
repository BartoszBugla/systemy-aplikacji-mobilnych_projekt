import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from 'src/modules/transaction/schemas/transaction.schema';
import { transactionFakeData } from './transaction-data';

import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class TransactionSeederService {
  logger = new Logger(TransactionSeederService.name);

  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly userService: UserService,
  ) {}

  async seed() {
    const myAccount = await this.userService.findOneByEmail(
      'buglabartosz@gmail.com',
    );

    const secondAccount =
      await this.userService.findOneByEmail('second@gmail.com');

    const res = await this.transactionModel.insertMany(
      transactionFakeData(String(myAccount._id), String(secondAccount._id)),
    );

    this.logger.log(`Transaction seeded ${res.length} records`);
  }

  async clear() {
    await this.transactionModel.deleteMany({}).exec();

    this.logger.log('Transaction collection cleared');
  }
}
