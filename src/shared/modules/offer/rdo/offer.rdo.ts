import { Expose } from 'class-transformer';
import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicationDate: string;

  @Expose()
  public city: Cities;

  @Expose()
  public preview: string;

  @Expose()
  public linksList: string[];

  @Expose()
  public isPremium: string;

  @Expose()
  public accommodationType: AccommodationType;

  @Expose()
  public roomsCount: string;

  @Expose()
  public guestsCount: string;

  @Expose()
  public price: string;

  @Expose()
  public facilities: Facilities[];

  @Expose()
  public author: string;

  @Expose()
  public coordinates: Coordinates;
}
