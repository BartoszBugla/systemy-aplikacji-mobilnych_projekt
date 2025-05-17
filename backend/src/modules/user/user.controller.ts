import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators/user.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetMeResponse } from './responses/get-me-response';
import { UsersResponse } from './responses/users-reponse';
import { Auth } from 'src/common/decorators/auth.decorator';

@Auth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOkResponse({
    type: GetMeResponse,
  })
  async getMe(@GetUser('sub') userId: string): Promise<GetMeResponse> {
    return GetMeResponse.mapFromUser(
      await this.userService.findOneById(userId),
    );
  }

  @Get('users')
  @ApiOkResponse({
    type: UsersResponse,
  })
  async getUsers(): Promise<UsersResponse> {
    return UsersResponse.mapFromUsers(await this.userService.getUsers());
  }
}
