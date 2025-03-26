import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export type CreateCommentRequest = Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>;
