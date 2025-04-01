import { Expose, Type } from 'class-transformer';
import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

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
  public isPremium: boolean;

  @Expose()
  public accommodationType: AccommodationType;

  @Expose()
  public roomsCount: number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public price: number;

  @Expose()
  public facilities: Facilities[];

  @Expose({ name: 'author'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public coordinates: Coordinates;
}
