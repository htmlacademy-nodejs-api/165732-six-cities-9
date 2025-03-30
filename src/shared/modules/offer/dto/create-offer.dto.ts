import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength,
  ArrayMinSize, ArrayMaxSize, IsString, IsNotEmpty, IsBoolean, IsNumber,
  IsMongoId, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';

export class CreateOfferDto {
  @IsString()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title: string;

  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
    description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
  @IsNotEmpty()
    publicationDate: Date;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  @IsNotEmpty()
    city: Cities;

  @IsString()
  @IsNotEmpty()
    preview: string;

  @IsArray({ message: CreateOfferValidationMessage.linksList.invalidFormat })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
    linksList: string[];

  @IsBoolean()
    isPremium: boolean;

  @IsEnum(AccommodationType, { message: CreateOfferValidationMessage.city.invalid })
    accommodationType: AccommodationType;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(8)
    roomsCount: number;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(8)
    guestsCount: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(10000, { message: CreateOfferValidationMessage.price.maxValue })
    price: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsEnum({ each: true, Facilities })
    facilities: Facilities[];

  @IsMongoId({ message: CreateOfferValidationMessage.author.invalidId })
    author: string;

  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates: Coordinates;
}
