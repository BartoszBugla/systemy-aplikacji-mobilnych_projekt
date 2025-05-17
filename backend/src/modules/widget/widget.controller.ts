import { Controller, Get, Query } from '@nestjs/common';

import { Auth } from 'src/common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { TotalAmountResponse } from './responses/total-amount-responses';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionGraphResponse } from './responses/transaction-graph-response';

@Controller()
@Auth()
export class WidgetController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('total-amount')
  @ApiOkResponse({
    type: TotalAmountResponse,
  })
  async totalAmount(
    @GetUser('sub') userId: string,
  ): Promise<TotalAmountResponse> {
    return {
      currency: 'USD',
      totalAmount:
        await this.transactionService.calculateAmountByUserId(userId),
    };
  }

  @Get('transaction-graph')
  @ApiOkResponse({
    type: TransactionGraphResponse,
  })
  async transactionGraph(
    @GetUser('sub') userId: string,
    @Query('from') from: Date,
  ): Promise<TransactionGraphResponse> {
    return this.transactionService.getGraphData(userId, from);
  }
}
