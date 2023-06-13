import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ErrorMessages } from '../../utils/maps/error.maps';

export class CreateUserDto {
  @Matches(RegExp('^[a-zA-Z ]+$'), { message: ErrorMessages.LETTERS_ONLY })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  name: string;

  @Matches(RegExp('^[a-zA-Z0-9_-]{3,30}$'), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  username: string;

  @Matches(RegExp('^[a-zA-Z]+$'), { message: ErrorMessages.LETTERS_ONLY })
  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  email: string;

  @IsPhoneNumber('ET', { message: ErrorMessages.IS_NOT_VALID })
  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  phoneNumber: string;

  @Matches(RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*W).*$'), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string;

  @Matches(RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*W).*$'), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  confirmPassword: string;
}
