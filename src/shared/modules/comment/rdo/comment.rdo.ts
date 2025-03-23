import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public offerId: string;

  @Expose()
  public rate: string;

  @Expose()
  public author: string;
}
