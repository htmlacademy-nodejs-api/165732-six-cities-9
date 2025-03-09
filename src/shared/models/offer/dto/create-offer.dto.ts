import { Cities, Type, Facilities } from '../../../types/offer-type.js';

export interface CreateOfferDto {
   title: string;
   description: string;
   publicationDate: string;
   city: Cities;
   preview: string;
   linksList: string[];
   isPremium: boolean;
   isFavorite: boolean;
   rate: number;
   accommodationType: Type;
   roomsCount: number;
   guestsCount: number;
   price: number;
   facilities: Facilities[];
   userId: string;
   coordinates: {
        latitude: number;
        longitude: number;
    }
}
