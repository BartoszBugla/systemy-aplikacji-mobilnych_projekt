import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { ICreateUser } from './interfaces/create-user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOneById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUserWithPassword(
    payload: ICreateUser,
  ): Promise<UserDocument | null> {
    const createdUserModel = new this.userModel(payload);

    return createdUserModel.save();
  }
}
