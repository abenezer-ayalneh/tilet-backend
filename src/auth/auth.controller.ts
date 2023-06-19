import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ErrorExceptionFilter } from 'src/utils/exception/error.filter';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-with-email.dto';

@Controller('auth')
@UseFilters(new ErrorExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() request: SignInDto) {
    return this.authService.signIn(request);
  }
}
