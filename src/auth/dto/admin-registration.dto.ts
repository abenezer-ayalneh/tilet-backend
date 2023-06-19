import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class AdminRegistrationDto {
  @Matches(RegExp('^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z ]*)*$'), {
    message: ErrorMessages.LETTERS_ONLY,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  name: string

  @Matches(RegExp('^[a-zA-Z0-9_.-]{3,30}$'), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  username: string

  @IsPhoneNumber('ET', { message: ErrorMessages.IS_NOT_VALID })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  phone_number: string

  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  email: string

  @Matches(RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$'), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string

  @IsBoolean({ message: ErrorMessages.IS_NOT_BOOLEAN })
  @IsOptional()
  status: boolean
}
