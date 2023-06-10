import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './user.service';
import { UserAuthDTO } from '../dto';
import { sanitizeUserObject } from '../helpers/utils.helper';
import { AuhtPayload, ProfileTypeDef } from '../types';
import { ErrorMessage } from '@Eywa/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(userAuthDTO: UserAuthDTO): Promise<ProfileTypeDef> {
    const { email, password } = userAuthDTO;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        ErrorMessage.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return sanitizeUserObject(user);
    } else {
      throw new HttpException(
        ErrorMessage.INVALID_CREDENTIALS,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async signPayload(payload: AuhtPayload): Promise<{ access_token: string }> {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRATION'),
    });
    return { access_token };
  }
}
