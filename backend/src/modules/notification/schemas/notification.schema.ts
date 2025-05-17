import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/modules/user/schemas/user.schema';

export type NotificationDocument = NotificationModel & mongoose.Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class NotificationModel {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  user: User | mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  message: string | null;

  @Prop({ type: Date, required: false, default: null })
  seenAt: Date | null;

  @Prop({ type: Boolean, required: false, default: false })
  seen: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationModel);
