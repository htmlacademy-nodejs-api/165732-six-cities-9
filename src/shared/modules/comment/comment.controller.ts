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

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Delete, handler: this.deleteById });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response): Promise<void> {
    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, result));
  }

  public async index(req: Request, res: Response) {
    const result = await this.commentService.findByOfferId(req.body.offerId);
    this.ok(res, fillDTO(CommentRdo, result));
  }

  public async deleteById(req: Request, res: Response) {
    const result = await this.commentService.deleteByOfferId(req.body.offerId);
    this.ok(res, fillDTO(CommentRdo, result));
  }
}
