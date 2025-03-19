import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDto } from '../dto/create-comment.dto.js';
import { CommentEntity } from '../comment.entity.js';
import { Nullable } from '../../../utils/common.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>;
  deleteByOfferId(offerId: string): Promise<Nullable<number>>;
}
