import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as webPush from 'web-push';
import { NotificationDocument } from '../notification/schemas/notification.schema';
import { PushSubscriptionModel } from './schemas/push-subscription.schema';
import { NotificationResponse } from '../notification/responses/notification.response';

@Injectable()
export class PushMessageService {
  constructor(
    @InjectModel(PushSubscriptionModel.name)
    private pushSubscriptionModel: Model<PushSubscriptionModel>,
  ) {}

  async registerSubscripion(
    userId: string,
    subscription: webPush.PushSubscription,
  ) {
    await this.pushSubscriptionModel
      .findOneAndUpdate(
        { user: userId },
        {
          endpoint: subscription.endpoint,
          expirationTime: subscription.expirationTime,
          user: userId,
          auth: subscription.keys.auth,
          p256dh: subscription.keys.p256dh,
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  async getSubscriber(
    userId: string,
  ): Promise<(PushSubscriptionModel | null)[]> {
    const userSubscriptions = await this.pushSubscriptionModel
      .find({
        user: new mongoose.Types.ObjectId(userId),
      })
      .exec();

    return userSubscriptions;
  }

  async sendNotification(
    notification: NotificationDocument,
  ): Promise<webPush.SendResult[]> {
    const subscriptions = await this.getSubscriber(notification.user as any);

    const sendMessage = subscriptions.map(async (subscription) => {
      const pushSub = {
        endpoint: subscription?.endpoint,
        expirationTime: subscription?.expirationTime,
        keys: {
          p256dh: subscription?.p256dh,
          auth: subscription?.auth,
        },
      };

      try {
        const sendResult = await webPush.sendNotification(
          pushSub,
          JSON.stringify(
            NotificationResponse.mapFromNotificationModel(notification),
          ),
        );

        if (sendResult) {
          console.log('Notification sent successfully', sendResult);
        } else {
          console.error('Failed to send notification', sendResult);
        }
        return sendResult;
      } catch (error) {
        console.error('Error sending notification', error);
        return null;
      }
    });

    return Promise.all(sendMessage);
  }
}
