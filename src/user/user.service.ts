import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustomException } from 'src/utils/exception/error.filter';
import { ErrorMessages } from 'src/utils/maps/error.maps';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/sign-in-with-email.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(request: CreateUserDto, picture: Express.Multer.File) {
    try {
      const hashedPassword = await argon.hash(request.password);
      let uploadedPicture: UploadApiResponse | undefined = undefined;
      if (picture) {
        uploadedPicture = await this.cloudinaryService.fileUpload(picture);
      }
      const user = await this.prismaService.user.create({
        data: {
          name: request.name,
          username: request.username,
          phone_number: request.phoneNumber,
          password: hashedPassword,
          email: request.email,
          picture: uploadedPicture?.secure_url,
          picture_public_id: uploadedPicture?.public_id,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ErrorCustomException(
            ErrorMessages.EXISTS,
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

  async getUsers() {
    try {
      return await this.prismaService.user.findMany({});
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else {
        throw new ErrorCustomException(
          ErrorMessages.SOMETHING_WENT_WRONG,
          HttpStatus.INTERNAL_SERVER_ERROR,
          'user',
        );
      }
    }
  }

  async getUserById(id: number) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
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

  async remove(userId: number) {
    try {
      await this.prismaService.user.delete({ where: { id: userId } });
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else {
        throw new ErrorCustomException(
          ErrorMessages.SOMETHING_WENT_WRONG,
          HttpStatus.INTERNAL_SERVER_ERROR,
          'user',
        );
      }
    }
  }

  async update(
    id: number,
    request: UpdateUserRequest,
    picture: Express.Multer.File,
  ) {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { id },
      });
      let uploadedPicture: UploadApiResponse | undefined = undefined;
      if (picture) {
        uploadedPicture = await this.cloudinaryService.fileUpload(picture);
        if (user.picture_public_id)
          this.cloudinaryService.cloudinary.uploader.destroy(
            user.picture_public_id,
          );
      }
      await this.prismaService.user.update({
        where: { id },
        data: {
          ...request,
          picture: uploadedPicture?.secure_url,
          picture_public_id: uploadedPicture?.public_id,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
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

  async check(request: SignInDto) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { username: request.username },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      } else if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new ErrorCustomException(
              ErrorMessages.NOT_FOUND,
              HttpStatus.UNAUTHORIZED,
              'username',
            );
          default:
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

  async findOne(id: number) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: { id: id },
      });
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

  async changePassword(id: number, request: ChangePasswordDto) {
    try {
      const userFromDb = await this.prismaService.user.findFirst({
        where: { id },
      });

      if (!userFromDb) {
        throw new ErrorCustomException(
          ErrorMessages.NOT_FOUND,
          HttpStatus.UNPROCESSABLE_ENTITY,
          'user',
        );
      } else {
        const passwordRegEx = new RegExp(
          this.configService.get('PASSWORD_VALIDATION_PATTERN'),
          'g',
        );

        if (passwordRegEx.test(request.password) === false) {
          throw new ErrorCustomException(
            ErrorMessages.PASSWORD_STRENGTH_FAILED,
            HttpStatus.UNPROCESSABLE_ENTITY,
            'password',
          );
        }

        const hashedPassword = await argon.hash(request.password);
        const updatedUser = await this.prismaService.user.update({
          where: { id },
          data: { password: hashedPassword },
        });

        return updatedUser;
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ErrorCustomException) {
        throw error;
      }
      throw new ErrorCustomException(
        ErrorMessages.SOMETHING_WENT_WRONG,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'user',
      );
    }
  }
}
