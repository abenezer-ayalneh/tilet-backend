import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinaryPackage } from 'cloudinary';
import { MODULE_OPTIONS_TOKEN } from './cloudinary.module-definition';
import { CloudinaryConfigOptions } from './interfaces/config-options.interface';

@Injectable()
export class CloudinaryService {
  public cloudinary = cloudinaryPackage;
  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: CloudinaryConfigOptions) {
    cloudinaryPackage.config(options);
  }
}
