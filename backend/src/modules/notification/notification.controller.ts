import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { GetUser } from 'src/common/decorators/user.decorator';
import { NotificationService } from './notification.service';
import { NotificationListResponse } from './responses/notification-list.response';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponse } from './responses/notification.response';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Auth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiCreatedResponse({
    type: NotificationListResponse,
  })
  async getNotifications(
    @GetUser('sub') userId: string,
  ): Promise<NotificationListResponse> {
    return NotificationListResponse.mapFromNotificationModel(
      await this.notificationService.getNotifications(userId),
    );
  }

  @Post()
  @ApiCreatedResponse({
    type: NotificationResponse,
  })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponse> {
    return NotificationResponse.mapFromNotificationModel(
      await this.notificationService.createNotification(createNotificationDto),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return NotificationResponse.mapFromNotificationModel(
      await this.notificationService.update(id, updateNotificationDto),
    );
  }
}
