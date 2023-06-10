import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../dto';
import { LocalAuthGuard } from '../guards';
import { AuthService, UsersService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDto) {
    const { email, password } = await this.userService.create(createUserDTO);

    // This is a temporary solution.
    // Users need to confirm their email address before they can login.
    // TODO: https://github.com/Sloticate-io/Eywa/issues/6
    return this.authService.signPayload({ email, password });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const { email, password } = req.user;
    return this.authService.signPayload({ email, password });
  }
}
