import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';

export interface UpdateOfferDto {
   id: string;
   title?: string;
   description?: string;
   city?: Cities;
   preview?: string;
   linksList?: string[];
   isPremium?: boolean;
   isFavorite?: boolean;
   rate?: number;
   accommodationType?: AccommodationType;
   roomsCount?: number;
   guestsCount?: number;
   price?: number;
   facilities?: Facilities[];
   coordinates?: Coordinates;
}
