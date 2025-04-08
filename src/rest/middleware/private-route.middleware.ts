import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../shared/libs/rest/errors/http-error.js';
import { Middleware } from '../../shared/libs/rest/middleware/middleware.interface.js';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
