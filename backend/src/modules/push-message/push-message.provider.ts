import * as webpush from 'web-push';
import { Provider } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

export const pushMessageProviderFactory = (): Provider => ({
  provide: 'PUSH_MESSAGE_SERVICE',
  useFactory: () => {
    webpush.setVapidDetails(
      'https://localhost:3001', // TODO env
      'BGMtpZEa7G1Lo48R69MoSOe0nfoDiFrwygvYrl0rtQm1ctvapWXlnMCwhVMnbhur9EUcde9EvsxzERzF7fonEMk', // TODO env
      '6dqZpALdrmhLa0c0uYSpYkk2kzPeKb4reugdGJFrqg0', // TODO env
    );

    return {};
  },
  inject: [ConfigService],
});
