import { inject, injectable } from 'inversify';
import { Response } from 'express';

import { BaseController } from '../../../rest/controller/base-controller.abstract.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { Logger } from '../../libs/logger/logger-interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './dto/user-service.interface.js';
import { Config } from '../../libs/config/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { UserRdo } from './rdo/user.rdo.js';
import { fillDTO } from '../../utils/common.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }


  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new Error(
        `User with email «${body.email}» exists.`,
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));

  }
}
