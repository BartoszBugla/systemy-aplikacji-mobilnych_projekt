import { ApiProperty } from '@nestjs/swagger';

import { NotificationDocument } from '../schemas/notification.schema';
import { NotificationResponse } from './notification.response';

export class NotificationListResponse {
  @ApiProperty({ type: [NotificationResponse] })
  data: NotificationResponse[];

  static mapFromNotificationModel(
    items: NotificationDocument[],
  ): NotificationListResponse {
    return {
      data: items.map((item) =>
        NotificationResponse.mapFromNotificationModel(item),
      ),
    };
  }
}
