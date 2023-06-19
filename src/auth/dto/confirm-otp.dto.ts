import { Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class ConfirmOtpRequest {
  @Min(10000, { message: ErrorMessages.MIN })
  @Max(99999, { message: ErrorMessages.MAX })
  @IsNumber(
    { maxDecimalPlaces: 0, allowNaN: false },
    { message: ErrorMessages.IS_NOT_NUMBER },
  )
  @Type(() => Number)
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  otpCode: number

  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  token: string

  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  email: string
}
