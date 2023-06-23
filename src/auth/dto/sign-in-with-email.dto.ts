import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/utils/maps/error.maps';

export class SignInDto {
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  @Transform(({ value }) => value?.trim())
  username: string;

  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  password: string;
}
