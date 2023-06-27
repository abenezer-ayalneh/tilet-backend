import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CloudinaryConfigOptions } from './interfaces/config-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<CloudinaryConfigOptions>()
    .setExtras(
      {
        isGlobal: false,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();

// import { ConfigurableModuleBuilder } from '@nestjs/common';
// import { CloudinaryConfigOptions } from './interfaces/config-options.interface';

// export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
//   new ConfigurableModuleBuilder<CloudinaryConfigOptions>().build();
