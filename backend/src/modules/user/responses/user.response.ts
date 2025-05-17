import { ApiProperty } from '@nestjs/swagger';
import { UserDocument } from '../schemas/user.schema';

export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;

  static mapFromUser(user: UserDocument): UserResponse {
    return {
      id: user?._id as string,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
  }
}
