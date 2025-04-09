import { types } from '@typegoose/typegoose';

import { OfferService } from './dto/offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/logger-interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentTypeOfferEntity, DocumentTypeOfferEntityNullable, OfferEntitiesNullable } from './dto/offer-service.interface.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
        @inject(Component.Logger) private readonly logger: Logger,
        @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}


  public async create(offer: CreateOfferDto): Promise<DocumentTypeOfferEntity> {
    const result = await this.offerModel.create(offer);
    this.logger.info(`New offer created: ${offer.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentTypeOfferEntityNullable>{
    return this.offerModel.findById(offerId).populate(['author']).exec();
  }

  public async updateById(offerId: string, offer: UpdateOfferDto): Promise<DocumentTypeOfferEntityNullable> {
    return this.offerModel.findByIdAndUpdate(offerId, offer, {new: true}).populate(['author']).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentTypeOfferEntityNullable> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async find(): Promise<DocumentTypeOfferEntity[]> {
    return this.offerModel
      .find()
      .populate(['author'])
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<OfferEntitiesNullable> {
    return this.offerModel.find({city, isPremium: true}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async documentAuthor(id: string): Promise<string | null> {
    const offer = await this.offerModel.findById(id);

    if (!offer) {
      return null;
    }

    return offer.author.id;
  }
}

