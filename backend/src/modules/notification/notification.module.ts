import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PushMessageModule } from '../push-message/push-message.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {
  NotificationModel,
  NotificationSchema,
} from './schemas/notification.schema';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    PushMessageModule,
    MongooseModule.forFeature([
      { name: NotificationModel.name, schema: NotificationSchema },
    ]),
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
