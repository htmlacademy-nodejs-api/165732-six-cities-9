import { Request } from 'express';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export type CreateOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>;
