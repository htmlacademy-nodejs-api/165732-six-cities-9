import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';

export interface CreateOfferDto {
   title: string;
   description: string;
   publicationDate: string;
   city: Cities;
   preview: string;
   linksList: string[];
   isPremium: boolean;
   rate: number;
   accommodationType: AccommodationType;
   roomsCount: number;
   guestsCount: number;
   price: number;
   facilities: Facilities[];
   author: string;
   coordinates: Coordinates;
}
