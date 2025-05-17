import { ApiProperty } from '@nestjs/swagger';
import * as webPush from 'web-push';

export class RegisterSubscriptionsDto {
  @ApiProperty()
  subscription: webPush.PushSubscription;
}
