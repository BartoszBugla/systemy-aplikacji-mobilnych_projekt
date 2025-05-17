import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FindAllTransactions } from './interfaces/find-all-transactions.interface';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

import { NotificationService } from '../notification/notification.service';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(
    userId: string,
    userEmail: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    const createdTransaction = new this.transactionModel({
      ...createTransactionDto,
      accountSender: userId,
    });

    const newTransaction = await createdTransaction.save();

    await this.notificationService.createNotification({
      message: `User ${userEmail} has sent you ${newTransaction.amount} ${newTransaction.currency}`,
      title: `New transaction received from ${userEmail}`,
      seen: false,
      userId: newTransaction.accountReceiver._id.toString(),
    });

    return newTransaction;
  }

  async findAll({
    userId,
  }: FindAllTransactions): Promise<TransactionDocument[]> {
    return this.transactionModel
      .find({
        $or: [{ accountReceiver: userId }, { accountSender: userId }],
      })
      .exec();
  }

  async calculateAmountByUserId(userId: string): Promise<number> {
    try {
      const result = await this.transactionModel.aggregate([
        {
          $facet: {
            received: [
              { $match: { accountReceiver: new Types.ObjectId(userId) } },
              { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
            ],
            sent: [
              { $match: { accountSender: new Types.ObjectId(userId) } },
              { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
            ],
          },
        },
        {
          $project: {
            receivedAmount: {
              $ifNull: [{ $arrayElemAt: ['$received.totalAmount', 0] }, 0],
            },
            sentAmount: {
              $ifNull: [{ $arrayElemAt: ['$sent.totalAmount', 0] }, 0],
            },
          },
        },
      ]);

      if (result.length > 0)
        return result[0].receivedAmount - result[0].sentAmount;

      return 0;
    } catch (error) {
      console.error('Error fetching and summing transactions:', error);
      throw error;
    }
  }

  async getDataByDate(userId: string, from: Date) {
    return this.transactionModel
      .where({
        $or: [{ accountReceiver: userId }, { accountSender: userId }],
        createdAt: { $gte: from },
      })
      .limit(1000);
  }

  async getGraphData(userId: string, from: Date) {
    const transactions = await this.getDataByDate(userId, from);

    const data = transactions.map((transaction) => ({
      currency: transaction.currency,
      date: (transaction as any).createdAt,
      amount: transaction.amount,
      type:
        transaction.accountReceiver.toString() === userId
          ? TransactionType.INCOME
          : TransactionType.EXPENSE,
    }));

    return {
      data,
    };
  }
}
