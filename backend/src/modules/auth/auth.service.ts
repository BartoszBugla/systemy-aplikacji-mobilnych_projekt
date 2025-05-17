import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { UserDocument } from '../user/schemas/user.schema';

const SALT_OR_ROUNDS = 10;

export interface IJwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateJwtToken(user: UserDocument) {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.generateJwtToken(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hash = await bcrypt.hash(registerDto.password, SALT_OR_ROUNDS);

    const newUser = await this.userService.createUserWithPassword({
      email: registerDto.email,
      password: hash,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
    });

    return {
      accessToken: await this.generateJwtToken(newUser),
    };
  }
}
