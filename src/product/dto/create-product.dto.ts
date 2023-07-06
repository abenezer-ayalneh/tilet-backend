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
  @IsOptional()
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
  @IsOptional()
  gender: 'MALE' | 'FEMALE' | 'BOTH';

  @IsString({ message: ErrorMessages.IS_NOT_STRING })
  @IsOptional()
  description?: string;

  @IsOptional()
  detail?: object;
}
