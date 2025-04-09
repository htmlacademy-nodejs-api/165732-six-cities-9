import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength,
  ArrayMinSize, ArrayMaxSize, IsString, IsNotEmpty, IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';
import { MAX_DESCRIPTION_LENGTH, MAX_GUESTS_AND_ROOMS_COUNT, MAX_LINKS_LENGTH, MAX_OFFER_TITLE_LENGTH, MAX_PRICE, MIN_DESCRIPTION_LENGTH, MIN_FACILITIES_LENGTH, MIN_GUESTS_AND_ROOMS_COUNT, MIN_LINKS_LENGTH, MIN_OFFER_TITLE_LENGTH, MIN_PRICE } from '../../../constants.js';

export class CreateOfferDto {
  @IsString()
  @MinLength(MIN_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
    title: string;

  @IsString()
  @MinLength(MIN_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
    description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
  @IsNotEmpty()
    publicationDate: Date;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
    city: Cities;

  @IsString()
    preview: string;

  @ArrayMinSize(MIN_LINKS_LENGTH)
  @ArrayMaxSize(MAX_LINKS_LENGTH)
  @IsString({ each: true })
    linksList: string[];

  @IsBoolean()
    isPremium: boolean;

  @IsEnum(AccommodationType, { message: CreateOfferValidationMessage.city.invalid })
    accommodationType: AccommodationType;

  @IsInt()
  @Min(MIN_GUESTS_AND_ROOMS_COUNT)
  @Max(MAX_GUESTS_AND_ROOMS_COUNT)
    roomsCount: number;

  @IsInt()
  @Min(MIN_GUESTS_AND_ROOMS_COUNT)
  @Max(MAX_GUESTS_AND_ROOMS_COUNT)
    guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(MIN_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(MAX_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
    price: number;

  @ArrayMinSize(MIN_FACILITIES_LENGTH)
  @IsEnum({ each: true, Facilities })
    facilities: Facilities[];

  author: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates: Coordinates;
}
