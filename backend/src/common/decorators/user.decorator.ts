import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from 'src/modules/auth/auth.service';

export const GetUser = createParamDecorator(
  (data: keyof IJwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IJwtPayload = request.user;

    return data ? user?.[data] : user;
  },
);
