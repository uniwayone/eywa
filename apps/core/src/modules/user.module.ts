import { Module } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas';
import { UsersController } from '../controllers';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
