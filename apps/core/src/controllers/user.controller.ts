import { Controller, Body, UseGuards, Get, Patch } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UpdateUserDto } from '../dto';
import { JwtAuthGuard } from '../guards';
import { User } from '../decorators';
import { sanitizeUserObject } from '../helpers/utils.helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@User() user) {
    const userProfile = await this.usersService.findByEmail(user.email);
    return sanitizeUserObject(userProfile);
  }

  // TODO: https://github.com/Sloticate-io/Eywa/issues/10
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async update(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return { msg: 'Profile updated successfully' };
  }
}
