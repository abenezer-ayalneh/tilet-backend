import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinaryPackage } from 'cloudinary';
import { MODULE_OPTIONS_TOKEN } from './cloudinary.module-definition';
import { CloudinaryConfigOptions } from './interfaces/config-options.interface';
import { ErrorCustomException } from 'src/utils/exception/error.filter';
import { access, unlink } from 'fs/promises';

@Injectable()
export class CloudinaryService {
  public cloudinary = cloudinaryPackage;
  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: CloudinaryConfigOptions) {
    cloudinaryPackage.config(options);
  }

  async fileUpload(picture: Express.Multer.File): Promise<UploadApiResponse> {
    const uploadedFile = await this.cloudinary.uploader.upload(
      picture.path,
      function (error) {
        if (error) ErrorCustomException.handle(error, 'picture');
      },
    );

    if (picture.path) {
      access(picture.path).then(async () => await unlink(picture.path));
    }

    return uploadedFile;
  }
}
