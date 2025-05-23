import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { PushSubscriptionModel } from 'src/modules/push-message/schemas/push-subscription.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop({ default: null, type: Number })
  limit?: number | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PushSubscriptionModel',
    required: [false],
  })
  subscriptions: PushSubscriptionModel | mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
