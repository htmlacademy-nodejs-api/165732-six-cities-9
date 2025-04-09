import { BaseController } from '../../../rest/controller/base-controller.abstract.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger-interface.js';
import { CommentService } from './dto/comment-service.interface.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { CreateCommentRequest } from './create-comment-request.type.js';
import { Response, Request } from 'express';
import { fillDTO } from '../../utils/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { PrivateRouteMiddleware } from '../../../rest/middleware/private-route.middleware.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoutes([
      { path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto)] },
      { path: '/', method: HttpMethod.Get, handler: this.index },
      { path: '/comments-count', method: HttpMethod.Get, handler: this.getCommentsCountByOfferId },
      { path: '/average-rate', method: HttpMethod.Get, handler: this.getAverageRateByOfferId }
    ]);
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response): Promise<void> {
    const result = await this.commentService.create({ ...body, author: tokenPayload.id });
    this.created(res, fillDTO(CommentRdo, result));
  }

  public async index(req: Request, res: Response) {
    const result = await this.commentService.findByOfferId(req.body.offerId);
    this.ok(res, fillDTO(CommentRdo, result));
  }

  public async getCommentsCountByOfferId(req: Request, res: Response) {
    const result = await this.commentService.calculateCommentsCountByOfferId(req.body.offerId);
    this.ok(res, result);
  }

  public async getAverageRateByOfferId(req: Request, res: Response) {
    const result = await this.commentService.calculateAverageRateByOfferId(req.body.offerId);
    this.ok(res, result);
  }

}
