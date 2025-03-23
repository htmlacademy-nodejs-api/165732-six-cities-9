import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';

export interface UpdateOfferDto {
   title?: string;
   description?: string;
   city?: Cities;
   preview?: string;
   linksList?: string[];
   isPremium?: boolean;
   accommodationType?: AccommodationType;
   roomsCount?: number;
   guestsCount?: number;
   price?: number;
   facilities?: Facilities[];
   coordinates?: Coordinates;
}
