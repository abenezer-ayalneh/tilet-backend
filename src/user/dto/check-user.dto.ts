import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from 'src/auth/dto/sign-in-with-email.dto';

export class CheckUserRequest extends PartialType(SignInDto) {}
