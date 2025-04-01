import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';
import { IsString, MinLength, MaxLength, IsEnum, ArrayMinSize, ArrayMaxSize, IsBoolean, IsInt, ValidateNested, Min, Max, IsOptional } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';
import { MAX_DESCRIPTION_LENGTH, MAX_GUESTS_AND_ROOMS_COUNT, MAX_LINKS_LENGTH, MAX_OFFER_TITLE_LENGTH, MAX_PRICE, MIN_DESCRIPTION_LENGTH, MIN_FACILITIES_LENGTH, MIN_GUESTS_AND_ROOMS_COUNT, MIN_LINKS_LENGTH, MIN_OFFER_TITLE_LENGTH, MIN_PRICE } from '../../../constants.js';

export class UpdateOfferDto {
  @IsString()
  @MinLength(MIN_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_OFFER_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  @IsOptional()
    title?: string;

  @IsString()
  @MinLength(MIN_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
  @IsOptional()
    description?: string;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  @IsOptional()
    city?: Cities;

  @IsString()
  @IsOptional()
    preview?: string;

  @ArrayMinSize(MIN_LINKS_LENGTH)
  @ArrayMaxSize(MAX_LINKS_LENGTH)
  @IsString({ each: true })
  @IsOptional()
    linksList?: string[];

  @IsBoolean()
  @IsOptional()
    isPremium?: boolean;

  @IsEnum(AccommodationType, { message: CreateOfferValidationMessage.city.invalid })
  @IsOptional()
    accommodationType?: AccommodationType;

  @IsInt()
  @Min(MIN_GUESTS_AND_ROOMS_COUNT)
  @Max(MAX_GUESTS_AND_ROOMS_COUNT)
  @IsOptional()
    roomsCount?: number;

  @IsInt()
  @Min(MIN_GUESTS_AND_ROOMS_COUNT)
  @Max(MAX_GUESTS_AND_ROOMS_COUNT)
  @IsOptional()
    guestsCount?: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(MIN_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(MAX_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
  @IsOptional()
    price?: number;

  @ArrayMinSize(MIN_FACILITIES_LENGTH)
  @IsOptional()
  @IsEnum({ each: true, Facilities })
    facilities?: Facilities[];

  @ValidateNested()
  @Type(() => CoordinatesDto)
  @IsOptional()
    coordinates?: Coordinates;
}
