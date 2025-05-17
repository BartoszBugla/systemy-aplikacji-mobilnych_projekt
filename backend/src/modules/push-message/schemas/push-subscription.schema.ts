import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

export type PushSubscriptionDocument = HydratedDocument<PushSubscriptionModel>;

@Schema({ timestamps: true })
export class PushSubscriptionModel extends Document {
  @Prop({ required: true, unique: true, trim: true })
  endpoint: string;

  @Prop({ required: false, trim: true, type: Number, unique: false })
  expirationTime: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true],
    unique: [false],
  })
  user: User | mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: false })
  p256dh: string;

  @Prop({ type: String, required: true, unique: false })
  auth: string;
}

export const PushSubscriptionSchema = SchemaFactory.createForClass(
  PushSubscriptionModel,
);
