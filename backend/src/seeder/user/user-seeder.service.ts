import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { userFakeData } from './user-fake-data';
import { User, UserDocument } from 'src/modules/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserSeederService {
  logger = new Logger(UserSeederService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async seed() {
    const fakeDataRegisters = userFakeData.map((user) => {
      return this.authService.register({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });

    await Promise.all(fakeDataRegisters);
  }

  async clear() {
    await this.userModel.deleteMany({}).exec();

    this.logger.log('User collection cleared');
  }
}
