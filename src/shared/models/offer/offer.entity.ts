import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Cities, Facilities, Type } from '../../types/offer-type.js';
import { UserEntity } from '../user/user.entity.js';

// for unique id
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

class Coordinates {
  @prop()
  public latitude: number;

  @prop()
  public longitude: number;
}

// merge defaultClasses.Base && defaultClasses.TimeStamps
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public publicationDate: string;

  @prop({ required: true, enum: Cities, type: () => String })
  public city: Cities;

  @prop({ required: true })
  public preview: string;

  @prop({required: true, default: [], type: () => [String] })
  public linksList: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rate: number;

  @prop({required: true, enum: Type, type: () => String })
  public accommodationType: Type;

  @prop({required: true})
  public roomsCount: number;

  @prop({required: true})
  public guestsCount: number;

  @prop({required: true})
  public price: number;

  @prop({required: true, default: [], enum: Facilities, type: () => String})
  public facilities: Facilities[];

  @prop({required: true, type: () => Coordinates})
  public coordinates: Coordinates;

  @prop({required: true})
  public title: string;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
