import * as webpush from 'web-push';
import { Provider } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

export const pushMessageProviderFactory = (): Provider => ({
  provide: 'PUSH_MESSAGE_SERVICE',
  useFactory: (configService: ConfigService) => {
    webpush.setVapidDetails(
      configService.getOrThrow('FRONTEND_URL'),
      configService.getOrThrow('VAPID_PUBLIC_KEY'),
      configService.getOrThrow('VAPID_PRIVATE_KEY'),
    );

    return {};
  },
  inject: [ConfigService],
});
