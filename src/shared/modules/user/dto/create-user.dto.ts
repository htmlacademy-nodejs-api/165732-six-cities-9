import { UserType } from '../../../types/user-type.js';
import { IsString, Length, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserMessages } from './create-user.messages.js';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../../constants.js';

export class CreateUserDto {
  @IsString()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, { message: CreateUserMessages.name.lengthField })
    name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
    email: string;

  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
    avatarPath: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, { message: CreateUserMessages.password.lengthField })
    password: string;

  @IsEnum(UserType, {message: CreateUserMessages.userType.invalidFormat})
  @IsNotEmpty()
    userType: UserType;
}
