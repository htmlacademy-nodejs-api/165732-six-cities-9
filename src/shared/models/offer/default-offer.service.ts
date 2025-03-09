import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './dto/offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/logger-interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(offer: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(offer);
    this.logger.info(`New offer created: ${offer.title}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }
}

