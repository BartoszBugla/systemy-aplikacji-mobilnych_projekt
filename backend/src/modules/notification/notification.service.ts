import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PushMessageService } from '../push-message/push.message.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  NotificationDocument,
  NotificationModel,
} from './schemas/notification.schema';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationModel.name)
    private notificationModel: Model<NotificationDocument>,
    private readonly pushMessageService: PushMessageService,
  ) {}

  async getNotifications(userId: string): Promise<NotificationDocument[]> {
    return this.notificationModel
      .find()
      .where({
        user: userId,
      })
      .exec();
  }

  async createNotification({
    userId,
    title,
    seen,
    message,
  }: CreateNotificationDto): Promise<NotificationDocument> {
    const notification = await this.notificationModel.create({
      user: userId,
      title,
      seen,
      seenAt: seen ? new Date() : null,
      message,
    });

    const newNotification = await notification.save();

    await this.pushMessageService.sendNotification(newNotification);

    return newNotification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const updateData = {};

    if (updateNotificationDto.seen) {
      Object.assign(updateData, {
        seen: true,
        seenAt: new Date(),
      });
    }

    return this.notificationModel.findByIdAndUpdate(
      id,
      {
        seen: true,
        seenAt: new Date(),
      },
      { new: true },
    );
  }
}
