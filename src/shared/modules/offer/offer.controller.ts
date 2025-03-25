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

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoutes([
      { path: '/', method: HttpMethod.Post, handler: this.create },
      { path: '/', method: HttpMethod.Get, handler: this.index },
      { path: '/:id', method: HttpMethod.Get, handler: this.findbyId },
      { path: '/:id', method: HttpMethod.Put, handler: this.edit },
      { path: '/:id', method: HttpMethod.Delete, handler: this.delete },
      { path: '/:city/premium', method: HttpMethod.Delete, handler: this.premiumForCity }
    ]);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async findbyId(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findById(req.params.id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async premiumForCity(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findIsPremiumByCity(req.params.city);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(req.params.id, req.body);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

}
