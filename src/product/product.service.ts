import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustomException } from 'src/utils/exception/error.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma.product.create({
        data: {
          name: createProductDto.name,
          picture: 'https://placehold.co/600x400',
          price: createProductDto.price,
          currency: createProductDto.currency,
          size: createProductDto.size,
          gender: createProductDto.gender,
          status: createProductDto.status,
          detail: createProductDto.detail,
          description: createProductDto.description,
        },
      });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  findAll() {
    try {
      return this.prisma.product.findMany({});
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.product.findFirstOrThrow({ where: { id } });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
        },
      });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  remove(id: number) {
    try {
      return this.prisma.product.delete({ where: { id } });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }
}
