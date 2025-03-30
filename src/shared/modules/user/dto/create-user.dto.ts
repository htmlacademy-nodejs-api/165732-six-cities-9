import { UserType } from '../../../types/user-type.js';
import { IsString, Length, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';

export class CreateUserDto {
  @IsString()
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
    name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
    email: string;

  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
    avatarPath: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
    password: string;

  @IsEnum(UserType, {message: CreateUserMessages.userType.invalidFormat})
  @IsNotEmpty()
    userType: UserType;
}
