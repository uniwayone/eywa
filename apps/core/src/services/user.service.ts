import { ErrorMessage } from '@Eywa/constants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto';
import { sanitizeUserObject } from '../helpers/utils.helper';
import { ProfileTypeDef } from '../types';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<ProfileTypeDef>) {}

  async create(createUserDTO: CreateUserDto) {
    const { email } = createUserDTO;
    const user = await this.findByEmail(email);

    if (user) {
      throw new HttpException(
        ErrorMessage.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST
      );
    }

    const newUser = new this.userModel(createUserDTO);

    newUser.created_at = new Date();

    try {
      await newUser.save();
    } catch (error) {
      return error;
    }

    return sanitizeUserObject(newUser);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
