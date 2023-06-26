import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/sign-in-with-email.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from './decorators/user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('profile')
  getProfile(@User() user: any) {
    return user;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('check')
  check(@Body() request: SignInDto) {
    return this.userService.check(request);
  }

  @Patch(':id')
  update(@Param('id') userId: string, @Body() request: UpdateUserRequest) {
    return this.userService.update(+userId, request);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(+userId);
  }

  @Patch('password/change')
  changePassword(@User('id') id: string, @Body() request: ChangePasswordDto) {
    return this.userService.changePassword(+id, request);
  }
}
