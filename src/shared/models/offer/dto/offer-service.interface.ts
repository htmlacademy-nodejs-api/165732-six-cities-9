import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from '../offer.entity.js';
import { CreateOfferDto } from './create-offer.dto.js';

export interface OfferService {
  create(offer: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
