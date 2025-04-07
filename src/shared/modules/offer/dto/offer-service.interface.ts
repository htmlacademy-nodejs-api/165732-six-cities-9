import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from '../offer.entity.js';
import { CreateOfferDto } from './create-offer.dto.js';
import { UpdateOfferDto } from './update-offer.dto.js';
import { Nullable } from '../../../utils/common.js';
import { DocumentExists } from '../../../types/document-exists.interface.js';

export type DocumentTypeOfferEntity = DocumentType<OfferEntity>
export type DocumentTypeOfferEntityNullable = Nullable<DocumentTypeOfferEntity>
export type OfferEntitiesNullable = Nullable<DocumentTypeOfferEntity[]>

export interface OfferService extends DocumentExists {
  create(offer: CreateOfferDto): Promise<DocumentTypeOfferEntity>;
  findById(offerId: string): Promise<DocumentTypeOfferEntityNullable>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentTypeOfferEntityNullable>;
  deleteById(offerId: string): Promise<DocumentTypeOfferEntityNullable>;
  find(): Promise<DocumentTypeOfferEntity[]>;
  findPremiumByCity(city: string): Promise<OfferEntitiesNullable>;
}
