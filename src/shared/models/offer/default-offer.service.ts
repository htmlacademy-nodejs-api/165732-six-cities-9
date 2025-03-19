import { types } from '@typegoose/typegoose';

import { OfferService } from './dto/offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/logger-interface.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentTypeOfferEntity, DocumentTypeOfferEntityNullable, OfferEntitiesNullable } from './dto/offer-service.interface.js';
import { CreateCommentDto } from '../comment/dto/create-comment.dto.js';
import { COMMENTS_INCREMENT, RATING_DECIMAL_PLACES_NUMBER, NUMBER_HALF_SEPARATOR } from '../../constants.js';


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
    return this.offerModel.findById(offerId).exec();
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

  public async findIsPremiumByCity(city: string): Promise<OfferEntitiesNullable> {
    return this.offerModel.find({city, isPremium: true}).exec();
  }

  public async addReview({ rate, offerId }: CreateCommentDto): Promise<DocumentTypeOfferEntityNullable> {
    const offer = await this.offerModel.findById(offerId);

    return this.offerModel
      .findByIdAndUpdate(offerId, {
        ...offer,
        rate: offer?.rate ? ((Number(offer.rate) + rate) / NUMBER_HALF_SEPARATOR).toFixed(RATING_DECIMAL_PLACES_NUMBER) : rate,
        '$inc': {
          commentsCount: COMMENTS_INCREMENT,
        },
      }, { new: true })
      .populate(['author'])
      .exec();
  }
}

