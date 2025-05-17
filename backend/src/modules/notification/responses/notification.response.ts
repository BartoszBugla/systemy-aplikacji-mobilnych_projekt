import { ApiProperty } from '@nestjs/swagger';
import { NotificationDocument } from '../schemas/notification.schema';

export class NotificationResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ nullable: true })
  message: string | null;
  @ApiProperty()
  userId: string;
  @ApiProperty({ nullable: true })
  seenAt: Date | null;
  @ApiProperty()
  seen: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  static mapFromNotificationModel(
    notification: NotificationDocument,
  ): NotificationResponse {
    return {
      userId: '',
      id: notification._id.toString(),
      title: notification.title,
      message: notification.message,
      seenAt: notification.seenAt,
      seen: notification.seen,
      createdAt: new Date(notification.createdAt),
      updatedAt: new Date(notification.updatedAt),
    };
  }
}
