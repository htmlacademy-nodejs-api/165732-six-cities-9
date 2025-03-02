import { config } from 'dotenv';

import { Logger } from '../../libs/logger/logger-interface.js';
import { Config } from './config.interface.js';
import { RestSchema } from './rest.schema.js';
import { configRestSchema } from './rest.schema.js';
import { injectable, inject } from 'inversify';
import { Component } from '../../../shared/types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    // parse from .env
    const parsedOutput = config();
    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }
    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}

