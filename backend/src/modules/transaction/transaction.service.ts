import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FindAllTransactions } from './interfaces/find-all-transactions.interface';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

import { NotificationService } from '../notification/notification.service';
import { TransactionType } from 'src/common/enums/transaction-type.enum';

import { UserService } from '../user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  async handleSendLimitExtendedNotification(userId: string): Promise<void> {
    try {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        console.error('User not found');
        return;
      }

      const spend = await this.spend(userId);
      const spendLimit = user.limit;

      if (spend.totalAmount > spendLimit) {
        await this.notificationService.createNotification({
          message: `Your spend limit has been exceeded! Please check your account to see the details.`,
          title: `Spend limit extended`,
          seen: false,
          userId,
        });
        return;
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  async create(
    userId: string,
    userEmail: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    let secondUserId = createTransactionDto.accountReceiver;
    let secondUserEmail = createTransactionDto.secondUserEmail;

    if (!secondUserId) {
      try {
        secondUserId = (
          await this.userService.findOneByEmail(
            createTransactionDto.secondUserEmail,
          )
        )._id as string;
      } catch {}
    }

    if (!secondUserEmail) {
      try {
        secondUserEmail = (await this.userService.findOneById(secondUserId))
          .email;
      } catch {}
    }

    if (userEmail === secondUserEmail) {
      throw new BadRequestException(
        'You cannot send money to yourself using the second user email',
      );
    }

    let createdTransaction: TransactionDocument;

    if (createTransactionDto.type === TransactionType.INCOME) {
      createdTransaction = new this.transactionModel({
        ...createTransactionDto,
        accountSender: secondUserId,
        accountReceiver: userId,
        secondUserEmail: secondUserEmail,
      });
    } else {
      createdTransaction = new this.transactionModel({
        ...createTransactionDto,
        accountSender: userId,
        accountReceiver: secondUserId,
        secondUserEmail: secondUserEmail,
      });
    }

    const newTransaction = await createdTransaction.save();

    // If user is sending money to himself, skip
    if (createTransactionDto.type !== TransactionType.INCOME) {
      await this.notificationService.createNotification({
        message: `User ${userEmail} has sent you ${newTransaction.amount} ${newTransaction.currency}`,
        title: `New transaction received from ${userEmail}`,
        seen: false,
        userId: newTransaction.accountReceiver._id.toString(),
      });
    }

    await this.handleSendLimitExtendedNotification(userId);

    return newTransaction;
  }

  async findAll({
    userId,
  }: FindAllTransactions): Promise<TransactionDocument[]> {
    return this.transactionModel
      .find({
        $or: [{ accountReceiver: userId }, { accountSender: userId }],
      })
      .populate('accountReceiver', 'email')
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

  async spend(userId: string) {
    const spendThisMonth = await this.transactionModel.aggregate([
      {
        $match: {
          accountSender: new Types.ObjectId(userId),
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalAmount = spendThisMonth[0]?.totalAmount || 0;

    return {
      totalAmount,
    };
  }
}
