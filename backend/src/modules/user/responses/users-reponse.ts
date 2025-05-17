import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';
import { UserDocument } from '../schemas/user.schema';

export class UsersResponse {
  @ApiProperty({ type: UserResponse, isArray: true })
  data: UserResponse[];

  static mapFromUsers(users: UserDocument[]): UsersResponse {
    return {
      data: users.map((user) => UserResponse.mapFromUser(user)),
    };
  }
}
