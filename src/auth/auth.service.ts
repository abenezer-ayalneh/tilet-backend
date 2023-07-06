import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ErrorCustomException } from 'src/utils/exception/error.filter';
import { ErrorMessages } from 'src/utils/maps/error.maps';
import { SignInDto } from './dto/sign-in-with-email.dto';

@Injectable({})
export class AuthService {
  private firebaseApp: any;
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async register(request: CreateUserDto, picture: Express.Multer.File) {
    try {
      const user = await this.userService.create(request, picture);

      return { ...(await this.signToken(user.id)), user };
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2016') {
          throw new ErrorCustomException(
            ErrorMessages.NOT_FOUND,
            HttpStatus.UNPROCESSABLE_ENTITY,
            'user',
          );
        } else {
          throw new ErrorCustomException(
            ErrorMessages.SOMETHING_WENT_WRONG,
            HttpStatus.INTERNAL_SERVER_ERROR,
            'user',
          );
        }
      } else {
        throw new ErrorCustomException(
          ErrorMessages.SOMETHING_WENT_WRONG,
          HttpStatus.INTERNAL_SERVER_ERROR,
          'user',
        );
      }
    }
  }

  async signIn(request: SignInDto) {
    const user = await this.userService.check(request);

    if (!user) {
      throw new ErrorCustomException(
        ErrorMessages.NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
        'username',
      );
    }

    const passwordMatches = await argon.verify(user.password, request.password);

    if (!passwordMatches) {
      throw new ErrorCustomException(
        ErrorMessages.MISMATCH,
        HttpStatus.UNAUTHORIZED,
        'password',
      );
    }

    return { ...(await this.signToken(user.id)), user };
  }

  async signToken(sub: number | string): Promise<{ accessToken: string }> {
    const token = await this.jwt.signAsync(
      { sub },
      {
        expiresIn: `${this.configService.get('JWT_TTL')}m`,
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    return {
      accessToken: token,
    };
  }
}
