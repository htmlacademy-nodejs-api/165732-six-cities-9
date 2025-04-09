import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { Middleware } from '../../shared/libs/rest/middleware/middleware.interface.js';
import { HttpError } from '../../shared/libs/rest/errors/http-error.js';
import { DocumentAuthor } from '../../shared/types/document-author.interface.js';

export class ValidateAuthorMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentAuthor,
    private readonly paramName: string,
  ) { }

  public async execute({ tokenPayload, params }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    const documentAuthor = await this.service.documentAuthor(documentId);

    if (tokenPayload.id !== documentAuthor) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `user with id ${tokenPayload.id} cannot change this ${this.paramName}`,
        'ValidateAuthorMiddleware'
      );
    }

    return next();
  }
}
