import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferService } from './dto/offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferController } from './offer.controller.js';
import { Controller } from '../../../rest/controller/controller.interface.js';

export const createOfferContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
};
