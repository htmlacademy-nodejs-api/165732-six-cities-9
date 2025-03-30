import { IsMongoId, IsString, Length, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public author: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  public rating: number;
}
