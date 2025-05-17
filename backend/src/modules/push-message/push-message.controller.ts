import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/common/decorators/user.decorator';

import { PushMessageService } from './push.message.service';
import { RegisterSubscriptionsDto } from './dto/register-subscriptions.dto';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('push-message')
@Auth()
export class PushMessageController {
  constructor(private readonly pushMessageService: PushMessageService) {}

  @Post('register')
  async register(
    @GetUser('sub') userId: string,
    @Body() body: RegisterSubscriptionsDto,
  ) {
    console.log('register', userId);
    return this.pushMessageService.registerSubscripion(
      userId,
      body.subscription,
    );
  }
}
