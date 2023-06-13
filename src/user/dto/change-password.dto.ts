import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ErrorMessages } from 'src/utils/maps/error.maps';

export class ChangePasswordDto {
  @Matches(RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$'), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string;
}
