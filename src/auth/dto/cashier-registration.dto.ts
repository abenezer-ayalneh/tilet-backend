import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class CashierRegistrationDto {
  @Matches(RegExp('^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z ]*)*$'), {
    message: ErrorMessages.LETTERS_ONLY,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  @Transform(({ value }) => value?.trim())
  name: string

  @Matches(RegExp('^[a-zA-Z0-9_.-]{3,30}$'), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  @Transform(({ value }) => value?.trim())
  username: string

  @IsPhoneNumber('ET', { message: ErrorMessages.IS_NOT_VALID })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  @Transform(({ value }) => value?.trim())
  phone_number: string

  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  email?: string

  @Matches(RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$'), {
    message: ErrorMessages.PASSWORD_STRENGTH_FAILED,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string

  @IsBoolean({ message: ErrorMessages.IS_NOT_BOOLEAN })
  @IsOptional()
  status: boolean

  // @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  retail_id?: number

  // @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  role_id?: number
}
