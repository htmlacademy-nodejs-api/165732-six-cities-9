import { IsMongoId, IsOptional, IsString, Length } from 'class-validator';
import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from '../../../constants.js';
import { CreateUserMessages } from './create-user.messages.js';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public avatarPath?: string;

  @IsString()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, { message: CreateUserMessages.name.lengthField })
  @IsOptional()
  public name?: string;

  @IsMongoId({each: true})
  @IsOptional()
  public favoriteOffersIds?: string[];
}
