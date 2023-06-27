import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ErrorMessages } from 'src/utils/maps/error.maps';

enum ProductSize {
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL',
  'XXXXL',
  'XXXXXL',
  'FREE',
}

export class CreateProductDto {
  @Transform(({ value }) => value?.trim())
  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  name: string;

  @IsNumber({}, { message: ErrorMessages.IS_NOT_NUMBER })
  @Type(() => Number)
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  price: number;

  @IsEnum(['BIRR', 'DOLLAR'], { message: ErrorMessages.IS_NOT_VALID })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  currency: 'BIRR' | 'DOLLAR';

  @IsEnum(ProductSize, {
    message: ErrorMessages.IS_NOT_VALID,
    each: true,
  })
  @IsOptional()
  size: Array<
    'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL' | 'XXXXL' | 'XXXXXL' | 'FREE'
  >;

  @IsEnum(['MALE', 'FEMALE', 'BOTH'], {
    message: ErrorMessages.IS_NOT_VALID,
  })
  @IsNotEmpty({ message: ErrorMessages.IS_EMPTY })
  gender: 'MALE' | 'FEMALE' | 'BOTH';

  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsOptional()
  description?: string;

  @IsEnum(['AVAILABLE', 'UNAVAILABLE', 'SOLD', 'COMING_SOON'], {
    message: ErrorMessages.IS_NOT_VALID,
  })
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'SOLD' | 'COMING_SOON';

  @IsOptional()
  detail?: object;
}
