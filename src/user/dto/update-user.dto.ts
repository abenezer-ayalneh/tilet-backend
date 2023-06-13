import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CashierRegistrationDto } from 'src/auth/dto/cashier-registration.dto';
export class UpdateUserRequest extends PartialType(
  OmitType(CashierRegistrationDto, ['password']),
) {}
