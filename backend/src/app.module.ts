import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WidgetModule } from './modules/widget/widget.module';
import { PushMessageModule } from './modules/push-message/push-message.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${process.env.Db_PORT}`),
    TransactionModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    WidgetModule,
    PushMessageModule,
    NotificationModule,
  ],
})
export class AppModule {}
