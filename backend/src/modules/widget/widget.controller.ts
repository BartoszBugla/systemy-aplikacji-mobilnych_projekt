import { Body, Controller, Get, Put, Query } from '@nestjs/common';

import { Auth } from 'src/common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { TotalAmountResponse } from './responses/total-amount-responses';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionGraphResponse } from './responses/transaction-graph-response';
import { SpendResponse } from './responses/spend-response';
import { TransactionCurrency } from 'src/common/enums/transaction-currency.enum';
import { UserService } from '../user/user.service';
import { NewSpendLimitDto } from './dto/new-spend-limit.dto';
import { GetMeResponse } from '../user/responses/get-me-response';

@Controller()
@Auth()
export class WidgetController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

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

  @Get('spend')
  @ApiOkResponse({
    type: SpendResponse,
  })
  async spend(@GetUser('sub') userId: string): Promise<SpendResponse> {
    const spend = await this.transactionService.spend(userId);
    const user = await this.userService.findOneById(userId);

    return {
      spend: spend.totalAmount,
      target: user.limit,
      currency: TransactionCurrency.USD,
    };
  }

  @Put('spend')
  @ApiOkResponse({
    type: GetMeResponse,
  })
  async setSpendLimit(
    @GetUser('sub') userId: string,
    @Body() body: NewSpendLimitDto,
  ): Promise<GetMeResponse> {
    const userDoc = await this.userService.setSpendLimit(userId, body.limit);

    return GetMeResponse.mapFromUser(userDoc);
  }
}
