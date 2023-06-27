import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ErrorExceptionFilter } from 'src/utils/exception/error.filter';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-with-email.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@UseFilters(new ErrorExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() request: SignInDto) {
    return this.authService.signIn(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UseInterceptors(FileInterceptor('picture', { dest: './uploads' }))
  signup(
    @Body() request: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }),
          new FileTypeValidator({
            fileType: RegExp('^image/(jpe?g|png|webp|svg+xml)$'),
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    picture: Express.Multer.File,
  ) {
    return this.authService.register(request, picture);
  }
}
