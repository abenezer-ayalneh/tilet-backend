import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserRequest extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}
