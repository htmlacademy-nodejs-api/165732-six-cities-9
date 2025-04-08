import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';

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
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { LoginUserRequest } from './login-user-request.type.js';
import { ValidateObjectIdMiddleware } from '../../../rest/middleware/validate-objectId.middleware.js';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UploadFileMiddleware } from '../../../rest/middleware/upload-file.middleware.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoutes([
      { path: '/register', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateUserDto)] },
      { path: '/:userId', method: HttpMethod.Post, handler: this.edit, middlewares: [new ValidateObjectIdMiddleware('userId'), new ValidateDtoMiddleware(UpdateUserDto)]},
      { path: '/:userId/favorite', method: HttpMethod.Get, handler: this.findFavoritesByUser, middlewares: [new ValidateObjectIdMiddleware('userId')] },
      { path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)] },
      { path: '/:userId/avatar', method: HttpMethod.Post, handler: this.uploadAvatar, middlewares: [new ValidateObjectIdMiddleware('userId'), new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),]},
      { path: '/login', method: HttpMethod.Get, handler: this.checkAuthenticate }
    ]);
  }


  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController');
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));

  }

  public async edit(req: Request, res: Response) {
    const result = await this.userService.updateById(req.params.userId, req.body);
    const responseData = fillDTO(UserRdo, result);
    this.ok(res, responseData);
  }

  public async findFavoritesByUser(req: Request, res: Response) {
    const result = await this.userService.findFavoritesByUser(req.params.userId);
    const responseData = fillDTO(UserRdo, result);
    this.ok(res, fillDTO(UserRdo, responseData.favoriteOffersIds));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async checkAuthenticate({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
