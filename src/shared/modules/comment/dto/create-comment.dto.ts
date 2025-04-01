import { IsMongoId, IsString, Length, IsNumber, Min, Max } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import { MAX_COMMENT_TEXT_LENGTH, MAX_RATING, MIN_COMMENT_TEXT_LENGTH, MIN_RATING } from '../../../constants.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(MIN_COMMENT_TEXT_LENGTH, MAX_COMMENT_TEXT_LENGTH, { message: CreateCommentMessages.text.lengthField })
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public author: string;

  @IsNumber()
  @Min(MIN_RATING)
  @Max(MAX_RATING)
  public rating: number;
}
