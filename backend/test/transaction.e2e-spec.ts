import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateTransactionDto,
  TransactionCategory,
  TransactionType,
} from 'src/modules/transaction/dto/create-transaction.dto';

import { TransactionModule } from 'src/modules/transaction/transaction.module';
import request from 'supertest';

const newExampleTransaction: CreateTransactionDto = {
  accountReceiver: '123456789',
  accountSender: '987654321',
  category: TransactionCategory.FOOD,
  amount: 100,
  type: TransactionType.INCOME,
  currency: 'USD',
  description: 'Test transaction',
};

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/transaction')
      .send(newExampleTransaction)
      .expect(200)
      .expect([]);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/transaction')
      .expect(200)
      .expect([newExampleTransaction]);
  });
});
