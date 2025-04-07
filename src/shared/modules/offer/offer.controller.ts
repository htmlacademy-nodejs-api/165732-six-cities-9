import { inject, injectable } from 'inversify';
import { BaseController } from '../../../rest/controller/base-controller.abstract.js';
import { HttpMethod } from '../../../rest/types/http-method.enum.js';
import { Logger } from '../../libs/logger/logger-interface.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './dto/offer-service.interface.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { Response, Request } from 'express';
import { fillDTO } from '../../utils/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { ValidateObjectIdMiddleware } from '../../../rest/middleware/validate-objectId.middleware.js';
import { ValidateDtoMiddleware } from '../../../rest/middleware/validate-dto.middleware.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentExistsMiddleware } from '../../../rest/middleware/document-exists.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    const validateObjectIdMiddleware = new ValidateObjectIdMiddleware('offerId');
    const documentExistsMiddleware = new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId');

    this.addRoutes([
      { path: '/', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)] },
      { path: '/', method: HttpMethod.Get, handler: this.index },
      { path: '/:offerId', method: HttpMethod.Get, handler: this.findbyId, middlewares: [validateObjectIdMiddleware, documentExistsMiddleware] },
      { path: '/:offerId', method: HttpMethod.Put, handler: this.edit, middlewares: [validateObjectIdMiddleware, new ValidateDtoMiddleware(UpdateOfferDto), documentExistsMiddleware] },
      { path: '/:offerId', method: HttpMethod.Delete, handler: this.delete, middlewares: [validateObjectIdMiddleware, documentExistsMiddleware] },
      { path: '/premium', method: HttpMethod.Get, handler: this.premiumForCity, middlewares: [validateObjectIdMiddleware] }
    ]);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async findbyId(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findById(req.params.offerId);

    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.offerId);
    this.noContent(res, result);
  }

  public async premiumForCity(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findPremiumByCity(req.body);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(req.params.offerId, req.body);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

}
