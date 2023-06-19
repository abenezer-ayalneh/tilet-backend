import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class SignInDto {
  @Matches(RegExp('^[a-zA-Z0-9_.-]{3,30}$'), {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  @Transform(({ value }) => value?.trim())
  username: string

  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string

  @IsEnum(['admin', 'cashier'])
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  role: 'admin' | 'cashier'
}
