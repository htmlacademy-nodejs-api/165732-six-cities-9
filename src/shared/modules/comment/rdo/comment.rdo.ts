import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public offerId: string;

  @Expose()
  public rate: number;

  @Expose({ name: 'author'})
  @Type(() => UserRdo)
  public author: UserRdo;
}
