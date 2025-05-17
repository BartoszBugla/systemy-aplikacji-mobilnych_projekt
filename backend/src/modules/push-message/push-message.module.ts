import { Module } from '@nestjs/common';
import { pushMessageProviderFactory } from './push-message.provider';
import { ConfigModule } from '@nestjs/config';
import { PushMessageController } from './push-message.controller';
import { PushMessageService } from './push.message.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PushSubscriptionModel,
  PushSubscriptionSchema,
} from './schemas/push-subscription.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: PushSubscriptionModel.name, schema: PushSubscriptionSchema },
    ]),
  ],
  providers: [pushMessageProviderFactory(), PushMessageService],
  controllers: [PushMessageController],
  exports: [PushMessageService],
})
export class PushMessageModule {}
