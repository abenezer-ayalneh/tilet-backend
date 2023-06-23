import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ErrorMessages } from '../../utils/maps/error.maps';

export class CreateUserDto {
  @Matches(RegExp(/^(?!.*\s{2,})[A-Za-z\s'-]{2,}$/), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  name: string;

  @Matches(RegExp(/^[A-Za-z0-9_.-]{3,20}$/), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  username: string;

  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  email: string;

  @IsPhoneNumber('ET', { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  phoneNumber: string;

  @Matches(RegExp(/^[a-zA-Z0-9!@#$%^&*()_+-={}|\[\];:'\",.<>/?]{8,64}$/), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string;

  @Matches(RegExp(/^[a-zA-Z0-9!@#$%^&*()_+-={}|\[\];:'\",.<>/?]{8,64}$/), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  confirmPassword: string;
}
