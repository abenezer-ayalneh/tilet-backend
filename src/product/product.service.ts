import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustomException } from 'src/utils/exception/error.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    picture: Express.Multer.File,
  ) {
    try {
      const uploadedImage = await this.cloudinary.fileUpload(picture);
      return this.prisma.product.create({
        data: {
          name: createProductDto.name,
          picture: uploadedImage.secure_url,
          picture_public_id: uploadedImage.public_id,
          price: createProductDto.price,
          currency: createProductDto.currency,
          size: createProductDto.size,
          gender: createProductDto.gender,
          detail: createProductDto.detail,
          description: createProductDto.description,
        },
      });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany({});
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.product.findFirstOrThrow({ where: { id } });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    picture: Express.Multer.File,
  ) {
    try {
      const product = await this.prisma.product.findFirstOrThrow({
        where: { id },
      });
      let uploadedFile = undefined;
      if (picture) {
        uploadedFile = await this.cloudinary.fileUpload(picture);
        if (product.picture_public_id)
          this.cloudinary.cloudinary.uploader.destroy(
            product.picture_public_id,
          );
      }
      return await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
          picture: uploadedFile?.secure_url,
          picture_public_id: uploadedFile?.public_id,
        },
      });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      ErrorCustomException.handle(error, 'product');
    }
  }
}
