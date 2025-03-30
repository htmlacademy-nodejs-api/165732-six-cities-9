import { Cities, AccommodationType, Facilities, Coordinates } from '../../../types/offer-type.js';
import { IsString, MinLength, MaxLength, IsEnum, IsArray, ArrayMinSize, ArrayMaxSize, IsBoolean, IsNumber, IsInt, ValidateNested, Min, Max, IsNotEmpty } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';
import { CoordinatesDto } from './coordinates.dto.js';

export class UpdateOfferDto {
  @IsString()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
    title?: string;

  @IsString()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
    description?: string;

  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  @IsNotEmpty()
    city?: Cities;

  @IsString()
  @IsNotEmpty()
    preview?: string;

  @IsArray({ message: CreateOfferValidationMessage.linksList.invalidFormat })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
    linksList?: string[];

  @IsBoolean()
    isPremium?: boolean;

  @IsEnum(AccommodationType, { message: CreateOfferValidationMessage.city.invalid })
    accommodationType?: AccommodationType;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(8)
  @IsNotEmpty()
    roomsCount?: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Max(8)
    guestsCount?: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(10000, { message: CreateOfferValidationMessage.price.maxValue })
    price?: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @IsEnum({ each: true, Facilities })
    facilities?: Facilities[];

  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates?: Coordinates;
}
