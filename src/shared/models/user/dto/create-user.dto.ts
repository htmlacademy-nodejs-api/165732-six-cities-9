import { UserType } from '../../../types/user-type.js';

export interface CreateUserDto {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: UserType;
}
