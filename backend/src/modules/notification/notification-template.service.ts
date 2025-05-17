import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';

@Injectable()
export class NotificationTemplateService {
  constructor(private readonly userService: UserService) {}
}

// const newTransactionNotificationTemplate = (
//   userTo: string,
//   userEmailFrom: string,
// ): Promise<CreateNotificationDto> => {
//   return {
//     message: 'New transaction',
//     title: `New transaction received from ${userEmailFrom}`,
//     seen: false,
//     userId: userTo,
//   };
