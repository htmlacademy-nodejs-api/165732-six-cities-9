import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';

export type CreateUserRequest = Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>;
