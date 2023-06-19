import { IsEmail, IsNotEmpty } from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class ForgetPasswordRequest {
  @IsEmail({}, { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  email: string
}
