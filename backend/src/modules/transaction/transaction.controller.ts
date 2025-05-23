import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionListResponse } from './responses/transaction-list.response';
import { TransactionResponse } from './responses/transaction.response';
import { TransactionService } from './transaction.service';

@Auth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiCreatedResponse({
    type: TransactionResponse,
  })
  async create(
    @GetUser('sub') userId: string,
    @GetUser('email') email: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return TransactionResponse.mapFromDoc(
      await this.transactionService.create(userId, email, createTransactionDto),
    );
  }

  @Get()
  @ApiOkResponse({
    type: TransactionListResponse,
  })
  async findAll(
    @GetUser('sub') userId: string,
  ): Promise<TransactionListResponse> {
    const data = await this.transactionService.findAll({ userId });

    return TransactionListResponse.mapFromDoc(data);
  }
}
