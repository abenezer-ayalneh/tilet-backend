import { IsNotEmpty } from 'class-validator'
import { ErrorMessages } from 'src/utils/maps/error.maps'

export class SignUpWithPhoneNumberDTO {
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  accessToken: string
}
