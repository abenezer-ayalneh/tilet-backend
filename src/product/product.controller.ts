import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture', { dest: './uploads' }))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }),
          new FileTypeValidator({
            fileType: RegExp('^image/(jpe?g|png|webp|svg+xml)$'),
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: true,
      }),
    )
    picture: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, picture);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('picture', { dest: './uploads' }))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2097152 }),
          new FileTypeValidator({
            fileType: RegExp('^image/(jpe?g|png|webp|svg+xml)$'),
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    picture: Express.Multer.File,
  ) {
    return this.productService.update(+id, updateProductDto, picture);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
