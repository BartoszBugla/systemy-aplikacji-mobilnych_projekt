import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { TransactionModule } from '../transaction/transaction.module';

import { UserModule } from '../user/user.module';

@Module({
  imports: [TransactionModule, UserModule],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
