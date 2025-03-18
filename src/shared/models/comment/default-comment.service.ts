import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './dto/comment-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from '../comment/dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('author');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('author');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }

  public async calculateCommentsByOfferId(offerId: string): Promise<number> {
    const comments = await this.commentModel.find({offerId});

    return comments.length;
  }

  public async calculateRateByOfferId(offerId: string): Promise<number> {
    const comments = await this.commentModel.find({offerId});

    const commentsSum = comments.map((comment) => comment.rate).reduce((a, b) => a + b, 0);
    const commentsCount = comments.length;

    // один знак после запятой
    return Math.round(commentsSum / commentsCount * 10) / 10;
  }


}
